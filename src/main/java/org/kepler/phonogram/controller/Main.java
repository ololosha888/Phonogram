package org.kepler.phonogram.controller;

import org.kepler.phonogram.model.*;
import org.kepler.phonogram.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@Controller
public class Main {
    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    PersonRepository personRepository;

    @Autowired
    PhonogramRepository phonogramRepository;

    @GetMapping("/")
    public String index(Model model) {
        List<Phonogram> phonograms = (List<Phonogram>) phonogramRepository.findAll();
        model.addAttribute("phonograms", phonograms);
        List<Person> persons = (List<Person>) personRepository.findAll();
        model.addAttribute("persons", persons);
        List<Department> departments = (List<Department>) departmentRepository.findAll();
        model.addAttribute("departments", departments);
        return "index";
    }

    private Person getPerson(String person) {
        Optional<Person> tempPerson = personRepository.findById(Integer.valueOf(person));
        Person newPerson = null;
        if(tempPerson.isPresent()) {
            newPerson = tempPerson.get();
        }
        return newPerson;
    }

    @PostMapping("/")
    public String add(@RequestParam String item,
                      @RequestParam String registrationDate,
                      @RequestParam String message,
                      @RequestParam String writer,
                      @RequestParam String sender,
                      @RequestParam String receiver,
                      Model model) {

        Phonogram phonogram = Phonogram.builder()
                .direction("1")
                .item(item)
                .registrationDate(registrationDate)
                .message(message)
                .writer(getPerson(writer))
                .sender(getPerson(sender))
                .receiver(getPerson(receiver))
                .build();
        phonogramRepository.save(phonogram);

        return "redirect:/";
    }

    @PostMapping("/removePhonogram")
    public String delete(@RequestParam int id, Model model) {
        Optional<Phonogram> phonogram = phonogramRepository.findById(id);
        if (phonogram.isPresent()) {
            phonogramRepository.delete(phonogram.get());
        }
        return "redirect:/";
    }

    @PostMapping("/updatePhonogram")
    public String update(@RequestParam String id,
                         @RequestParam String item,
                         @RequestParam String registrationDate,
                         @RequestParam String message,
                         @RequestParam String writer,
                         @RequestParam String sender,
                         @RequestParam String receiver,
                         Model model) {

        Phonogram phonogram = Phonogram.builder()
                .id(Integer.parseInt(id))
                .direction("1")
                .item(item)
                .registrationDate(registrationDate)
                .message(message)
                .writer(getPerson(writer))
                .sender(getPerson(sender))
                .receiver(getPerson(receiver))
                .build();
        phonogramRepository.save(phonogram);

        return "redirect:/";
    }

}
