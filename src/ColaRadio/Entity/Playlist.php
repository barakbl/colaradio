<?php
// src/ColaRadio/Entity/Playlist.php
namespace ColaRadio\Entity;

/**
 * @Entity (repositoryClass="ColaRadio\Repositories\Playlist")
 * @Table(name="playlists")
 * @ManyToOne(targetEntity="Rooms")
 * @JoinColumn(name="room_id", referencedColumnName="id")
 *
 */
class Playlist {
    /**
     * @Id @Column(type="integer")
     * @GeneratedValue
     */
    private $id;

    /**
     *  @Column(type="integer")
     */
    private $room_id;

    /** @Column(type="text") */
    private $name;

    /**
     * @Column(type="text")
     */
    private $description;

    /** @ManyToOne(targetEntity="Rooms") */
    private $room;

    public function getRoom() { return $this->room; }
}