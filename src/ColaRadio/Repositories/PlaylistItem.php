<?php

namespace ColaRadio\Repositories;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\DBAL\Types\Type;

class PlaylistItem extends EntityRepository {

    /**
     * @return array
     */
    public function getMetaData() {
        return array();
    }

    /**
     * @return array
     */
    public function getStatistic() {
        return array();
    }
}