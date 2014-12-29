<?php

namespace ColaRadio;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Silex\Application;

class AppController
{
    public function loginAction(Application $app, Request $request){
        return $app['twig']->render('App/login.twig', array(
            'error'         => $app['security.last_error']($request),
            'last_username' => $app['session']->get('_security.last_username'),
        ));
    }

    public function indexAction(Application $app) {
        return $app['twig']->render('App/home.twig', array(
            'name' => "homepage",
        ));
    }
}