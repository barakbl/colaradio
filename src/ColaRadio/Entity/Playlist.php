<?php
// src/ColaRadio/Entity/Playlist.php
namespace ColaRadio\Entity;

/**
 * @Entity (repositoryClass="ColaRadio\Repositories\Playlist")
 * @Table(name="playlist")
 */
class Playlist {
    /**
     * @Id @Column(type="integer")
     * @GeneratedValue
     */
    private $id;

    /**
     * @Id @Column(type="integer")
     */
    private $room_id;

    /** @Column(type="text") */
    private $name;

    /**
     * @Column(type="text")
     */
    private $description;

    /**
     *  @Column(datetime)
     */
    private $created_at;

    /**
     *  @Column(datetime)
     */
    private $last_update;

}