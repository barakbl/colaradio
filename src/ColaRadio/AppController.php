<?php

namespace ColaRadio;

use Symfony\Component\HttpFoundation\Response;
use Silex\Application;

class AppController
{
    public function homeAction(Application $app)
    {
        return $app['twig']->render('App/home.twig', array(
            'name' => "noam",
        ));
    }
}