<?php
// src/ColaRadio/Entity/Rooms.php
namespace ColaRadio\Entity;

/**
 * @Entity (repositoryClass="ColaRadio\Repositories\Rooms")
 * @Table(name="rooms")
 * @OneToOne(targetEntity="Users")
 * @JoinColumn(name="user_id", referencedColumnName="id")
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



    public function getId() { return $this->id; }
    public function getName() { return $this->name; }

}