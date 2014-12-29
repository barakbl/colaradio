<?php

namespace ColaRadio\Repositories;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\DBAL\Types\Type;

class Playlist extends EntityRepository {

    /**
     * @return array
     */
    public function getData() {
        return array('d');
    }



}