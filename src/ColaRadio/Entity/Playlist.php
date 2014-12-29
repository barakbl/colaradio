<?php
// src/ColaRadio/Entity/Playlist.php
namespace ColaRadio\Entity;

/**
 * @Entity (repositoryClass="ColaRadio\Repositories\Playlist")
 * @Table(name="playlists")
 * @ManyToOne(targetEntity="Rooms")
 * @JoinColumn(name="room_id", referencedColumnName="id")
 * *@ManyToOne(targetEntity="PlaylistItem")
 * @JoinColumn(name="id", referencedColumnName="playlist_id")
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




    public function getName() { return $this->name; }
    public function getDescription() { return $this->description; }
    public function getId() { return $this->id; }

    public function getRoom() { return $this->room; }

    public function getPlaylistItems() {



    }
}