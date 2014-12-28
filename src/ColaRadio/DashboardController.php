<?php

namespace ColaRadio;

use MyProject\Proxies\__CG__\OtherProject\Proxies\__CG__\stdClass;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

class DashboardController
{
  public function loginAction(Application $app,Request $request){
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