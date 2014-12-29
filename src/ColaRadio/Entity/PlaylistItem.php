<?php
// src/ColaRadio/Entity/PlaylistItem.php
namespace ColaRadio\Entity;

/**
 * @Entity (repositoryClass="ColaRadio\Repositories\PlaylistItem")
 * @Table(name="playlist_item")
 */
class PlaylistItem {
    /**
     * @Id @Column(type="integer")
     * @GeneratedValue
     */
    private $id;

    /**
     * @Id @Column(type="integer")
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

    /**
     *  @Column(datetime)
     */
    private $created_at;

    /**
     *  @Column(datetime)
     */
    private $last_update;

}