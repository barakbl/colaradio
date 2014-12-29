<?php

namespace ColaRadio;

use Doctrine\Tests\Models\Quote\User;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;
use ColaRadio\Entity\Playlist;

class ApiController
{
    public function __construct() {
    }

    public function playlistAction(Application $app) {
        $obj = array();

        $token = $app['security']->getToken();
        $playlistId = 1;
        if (null !== $token) {
            $user = $token->getUser();


        } else {
            return $app->json("Access Denied", 401);
        }
        $result = $app['db.orm.em']
            ->find('ColaRadio\Entity\Playlist',$playlistId);

        $items = array();


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

        $obj = array(
            'id' => $result->getId(),
            'name' => $result->getName(),
            'description' => $result->getDescription(),
            'items' => $items
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
}