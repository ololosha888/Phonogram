package org.kepler.phonogram.model;

import lombok.*;
import javax.persistence.*;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Builder
@Table(name = "phonogram")
@Entity
public class Phonogram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String direction;
    private String item;
    @Column(name = "date_time")
    private String registrationDate;
    private String message;
    @ManyToOne
    @JoinColumn(name = "writer_id")
    private Person writer;
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Person sender;
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private Person receiver;
    @Transient
    private String oracleId;
}
