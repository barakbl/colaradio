<?php
// lib/Gonzalo123/BlogController.php

namespace ColaRadio;

use Symfony\Component\HttpFoundation\Response;

class BlogController
{
    public function homeAction()
    {
        return new Response("BlogController::homeAction");
    }
}