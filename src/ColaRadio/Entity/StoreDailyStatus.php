<?php
// src/ColaRadio/Entity/StoreDailyStatus.php
namespace ColaRadio\Entity;

/**
 * @Entity (repositoryClass="ColaRadio\Repositories\StoreDailyStatus")
 * @Table(name="store_daily_status")
 */
class StoreDailyStatus {
    /**
     * @Id @Column(type="integer")
     * @GeneratedValue
     */
    private $id;

    /** @Column(type="text") */
    private $name;

    /**
     * @Column(type="integer")
     */
    private $store_id;

    /**
     *  @Column(type="string", columnDefinition="ENUM('done', 'started')")
     */
    private $status;


    /**
     *  @Column(type="date")
     */
    private $last_day;

    /**
     *  @Column(type="smallint")
     */
    private $timezone;

    /**
     *  @Column(type="string", columnDefinition="ENUM('pixel','feed')")
     */
    private $fetch_data_type;

}