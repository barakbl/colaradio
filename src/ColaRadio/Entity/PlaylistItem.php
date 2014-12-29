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
     * @param mixed $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @param mixed $is_deleted
     */
    public function setIsDeleted($is_deleted)
    {
        $this->is_deleted = $is_deleted;
    }

    /**
     * @param mixed $playlist_id
     */
    public function setPlaylistId($playlist_id)
    {
        $this->playlist_id = $playlist_id;
    }

    /**
     * @param mixed $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @param mixed $user_id
     */
    public function setUserId($user_id)
    {
        $this->user_id = $user_id;
    }
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
    public function getIsDeleted() { return $this->is_deleted; }

    public function getType() { return $this->type; }
    public function setId($id) {  $this->id = $id; }
    public function getUserId() { return $this->user_id; }


}