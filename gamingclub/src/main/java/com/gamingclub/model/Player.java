package com.gamingclub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "players")
public class Player {
   @Id
   private String id;
   private String playerName;
   private String emailId;
   private String phoneNumber;
   private int age;
   private String bio;

   public Player() {

   }

   public Player(String playerName, String emailId, String phoneNumber, int age, String bio) {
    this.playerName = playerName;
    this.emailId = emailId;
    this.phoneNumber = phoneNumber;
    this.age = age;
    this.bio = bio;
   }

   public String getId(){
    return id;
   }

   public void setId(String id){
    this.id = id;
   }

   public String getPlayerName(){
    return playerName;
   }

   public void setPlayerName(String playerName){
    this.playerName = playerName;
   }

   public String getEmailId(){
    return emailId;
   }

   public void setEmailId(String emailId){
    this.emailId = emailId;
   }

   public String getPhoneNumber(){
    return phoneNumber;
   }

   public void setPhoneNumber(String phoneNumber){
    this.phoneNumber = phoneNumber;
   }

   public int getAge(){
    return age;
   }

   public void setAge(int age){
    this.age = age;
   }

   public String getBio(){
    return bio;
   }

   public void setBio(String bio){
    this.bio = bio;
   }
}