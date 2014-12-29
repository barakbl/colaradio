<?php

namespace ColaRadio\Repositories;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\DBAL\Types\Type;

class Rooms extends EntityRepository {

    /**
     * @return array
     */
    public function getInfo() {
        return array();
    }




}