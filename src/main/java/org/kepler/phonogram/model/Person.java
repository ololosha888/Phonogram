package org.kepler.phonogram.model;

import lombok.*;
import javax.persistence.*;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Builder
@Table(name = "person")
@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String login;
    private String pass;
    private String fio;
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}
