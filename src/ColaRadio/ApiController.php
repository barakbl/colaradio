<?php

namespace ColaRadio;

use ColaRadio\Repositories\PlaylistItem;
use Doctrine\Tests\Common\Annotations\Ticket\Doctrine\ORM\Mapping\Entity;
use Doctrine\Tests\Models\Quote\User;
use Silex\RequestContext;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;
use ColaRadio\Entity\Playlist;

class ApiController
{
    public function __construct() {
    }

    public function playlistAction(Application $app) {

        $token = $app['security']->getToken();
        if (null !== $token) {
            $user = $token->getUser();
        } else {
            return $app->json("Access Denied", 401);
        }
        $result = $app['db.orm.em']->getRepository('ColaRadio\Entity\Playlist')
            ->findOneBy(array('room_id' => $user->userRoomId));
        $items = array();

        $playlistId  = $result->getId();



        $itemsRes = $app['db.orm.em']->getRepository('ColaRadio\Entity\PlaylistItem')
            ->findBy(array('playlist_id' => $playlistId,'is_deleted' => 0)
            );

        foreach($itemsRes as $item) {
            $items[] = array(
                'id' => $item->getId(),
                'type' => $item->getType(),
                'content' => $item->getContent(),
            );
        }

        $room = $app['db.orm.em']->getRepository('ColaRadio\Entity\Rooms')
            ->findOneBy(array('id' => $user->userRoomId));
        $roomData = array(
            'id' => $room->getId(),
            'name' => $room->getName(),
            'motd' => $room->getMotd()

        );
        $obj = array(
            'id' => $result->getId(),
            'name' => $result->getName(),
            'description' => $result->getDescription(),
            'items' => $items,
            'room' => $roomData
        );
        return  $app->json($obj);
    }

    public function userAction(Application $app,$id) {
        $token = $app['security']->getToken();
        if (null !== $token) {
            if($id) {

            } else {

            }
        } else {
            return $app->json("Access Denied", 401);
        }
        $obj = array();
        return  $app->json($obj);
    }

    public function playlistItemPostAction(Application $app, Request $request) {
        $content = $request->get('content');
        if(empty($content)) {
            return $app->json("bad url", 500);
        }
        $type = $request->get('type');
        if(empty($type) || $type != 'youtube') {
            return $app->json("not youtube bitch?", 500);
        }

        $playlistId = $request->get('playlist_id');
        if(empty($type) || !$playlistId > 0) {
            return $app->json("not youtube bitch?", 500);
        }

        $token = $app['security']->getToken();
        if (null !== $token) {

            $list = new \ColaRadio\Entity\PlaylistItem();
            $list->setPlaylistId($playlistId);
            $list->setContent($content);
            $list->setUserId(1);
            $list->setIsDeleted(0);



            $list->setType($type);
            $app['db.orm.em']->persist($list);
            $app['db.orm.em']->flush();

            $result = $app['db.orm.em']->getRepository('ColaRadio\Entity\PlaylistItem')
                ->findOneBy(array('id' => $list->getId()));

            $res[] = array(
                'id' => $result->getId(),
                'type' => $result->getType(),
                'content' => $result->getContent(),
            );
            return $app->json($res);
        } else {
            return $app->json("Access Denied", 401);
        }

    }

    public function motdPostAction(Application $app, Request $request) {
        $content = $request->get('content');
        if(empty($content)) {
            return $app->json("where is the content, bitch?", 500);
        }
        $token = $app['security']->getToken();
        if (null !== $token) {
            $user = $token->getUser();
        } else {
            return $app->json("Access Denied", 401);
        }
        $room = $app['db.orm.em']->getRepository('ColaRadio\Entity\Rooms')
            ->findOneBy(array('id' => $user->userRoomId));

        $room->setId($user->userRoomId);
        $room->setMotd($content);
        $app['db.orm.em']->merge($room);
        $app['db.orm.em']->flush();
        return "{}";
    }

    public function playlistItemDeleteAction($id,Application $app, Request $request) {
        $token = $app['security']->getToken();
        if (null !== $token) {
            $user = $token->getUser();
        } else {
            return $app->json("Access Denied", 401);
        }
        $result = $app['db.orm.em']->getRepository('ColaRadio\Entity\PlaylistItem')
            ->findOneBy(array('id' => $id));
        $result->setIsDeleted(1);
        if($result->getUserId() ==$user->id ) {
            $app['db.orm.em']->persist($result);
            $app['db.orm.em']->flush();
        } else {
            return $app->json("Access Denied", 401);
        }

        return $app->json("{}");

    }
}