package com.gamingclub.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gamingclub.model.Player;
import com.gamingclub.repository.PlayerRepository;

@Service
public class PlayerService {
    
    @Autowired
    private PlayerRepository playerRepository;

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Optional<Player> getPlayerById(String id) {
        return playerRepository.findById(id);
    }

    public Player addPlayer(Player player) {
        return playerRepository.save(player);
    }

    public Player updatePlayer(String id, Player playerDetails) {
        Optional<Player> playerOptional = playerRepository.findById(id);
        if (playerOptional.isPresent()) {
            Player player = playerOptional.get();
            // New line added
            player.setPlayerName(playerDetails.getPlayerName());
            player.setPhoneNumber(playerDetails.getPhoneNumber());
            player.setEmailId(playerDetails.getEmailId());
            player.setPhoneNumber(playerDetails.getPhoneNumber());
            player.setAge(playerDetails.getAge());
            player.setBio(playerDetails.getBio());
            return playerRepository.save(player);
        }
        return null;
    }

    public void deletePlayer(String id) {
        playerRepository.deleteById(id);
    }
}
