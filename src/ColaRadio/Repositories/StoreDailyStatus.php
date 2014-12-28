<?php

namespace ColaRadio\Repositories;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\DBAL\Types\Type;

class StoreDailyStatus extends EntityRepository {

    /**
     * this is stupid placeholder
     * @return string
     */
    public function getCount() {
        return "1";
    }

}