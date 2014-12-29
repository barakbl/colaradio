<?php
// src/ColaRadio/Entity/PlaylistItem.php
namespace ColaRadio\Entity;

/**
 * @Entity (repositoryClass="ColaRadio\Repositories\PlaylistItem")
 * @Table(name="playlist_item")
 * @ManyToOne(targetEntity="Playlist")
 * @JoinColumn(name="playlist_id", referencedColumnName="id")
 */
class PlaylistItem {
    /**
     * @Id @Column(type="integer")
     * @GeneratedValue
     */
    private $id;

    /**
     * @Column(type="integer")
     */
    private $playlist_id;

    /** @Column(type="integer") */
    private $user_id;

    /**
     * @Column(type="text")
     */
    private $content;

    /**
     * @Column(type="text")
     */
    private $type;

    /**
     * @Column(type="boolean")
     */
    private $is_deleted;

    public function getName() { return $this->name; }
    public function getContent() { return $this->content; }
    public function getId() { return $this->id; }
    public function getType() { return $this->type; }


}