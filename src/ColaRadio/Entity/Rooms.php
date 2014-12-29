<?php
// src/ColaRadio/Entity/Rooms.php
namespace ColaRadio\Entity;

/**
 * @Entity (repositoryClass="ColaRadio\Repositories\Rooms")
 * @Table(name="rooms")
 */
class Rooms {
    /**
     * @Id @Column(type="integer")
     * @GeneratedValue
     */
    private $id;

    /** @Column(type="text") */
    private $name;

    /**
     * @Column(type="text")
     */
    private $motd;

    /**
     *  @Column(datetime)
     */
    private $created_at;

}