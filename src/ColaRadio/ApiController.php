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
        if (null !== $token) {

            $user = $token->getUser();
            echo "<pre>";
            print_r($user);die;

        } else {
            return $app->json("Access Denied", 401);
        }
        $result = $app['db.orm.em']
            ->find('ColaRadio\Entity\Playlist',2);

        echo "<pre>";

        print_r($result->getRoom()->getName());
        die;
        $result = $app['db.orm.em']
            ->getRepository('ColaRadio\Entity\Playlist')
            ->createQueryBuilder('e')
            ->select('e')
            ->getQuery()
            ->getResult(\Doctrine\ORM\Query::HYDRATE_ARRAY);

        echo "<pre>";
        print_r($result);die;
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