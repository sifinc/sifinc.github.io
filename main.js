var sifinc = angular.module('sifinc', []);

sifinc.controller('mainController', function MainController($scope, $interval, game, player, songs, cards, skill, scout) {
    var timer = $interval(function () {
        if (player.getLp().cur < player.getLp().max) {
            player.addLp(1);
        }
    }, 1000, 0);



    $scope.setSelectedScreen = function(value) {
        game.setSelectedScreen(value);
    }

    $scope.getSelectedScreen = function() {
        return game.getSelectedScreen();
    }



    $scope.getPlayerLevel = function() {
        return player.getLevel();
    }

    $scope.getPlayerGold = function() {
        return player.getGold();
    }

    $scope.getPlayerFriendPoints = function() {
        return player.getFriendPoints();
    }

    $scope.getPlayerLoveca = function() {
        return player.getLoveca();
    }

    $scope.getPlayerExperience = function() {
        return player.getExperience();
    }

    $scope.getPlayerLp = function() {
        return player.getLp();
    }




    $scope.setDifficulty = function(value) {
        songs.selectDifficulty(value);
    }

    $scope.getDifficulty = function() {
        return songs.getDifficulty();
    }

    $scope.getDifficultyName = function(value) {
        return songs.getDifficultyName(value);
    }

    $scope.getSongCost = function() {
        return songs.getSongCost();
    }

    $scope.changeSelectedSong = function(value) {
        songs.changeSelectedSong(value);
    }

    $scope.getSelectedSongValue = function() {
        return songs.getSelectedSongValue();
    }

    $scope.getSelectedSong = function() {
        return songs.getSelectedSong();
    }

    $scope.getPrizeType = function(value) {
        if (value == 0) return "Gold";
        if (value == 1) return "Friend Points";
        if (value == 2) return "Love Gems";
        return "Error";
    }

    $scope.playSong = function() {
        songs.playSong();
    }

    $scope.getLastCombo = function() {
        return songs.getLastCombo();
    }

    $scope.getLastScore = function() {
        return songs.getLastScore();
    }



    $scope.getCardList = function() {
        return cards.getCardList();
    }



    $scope.getSkillLevel = function() {
        return skill.getLevel();
    }
    $scope.getSkillExperience = function() {
        return skill.getExperience();
    }
    $scope.getHitChance = function() {
        return skill.getHitChance();
    }



    $scope.regularScout = function(value, cost) {
        scout.regularScout(value, cost);
    }

    $scope.getLatestScout = function() {
        return scout.getLatestScout();
    }
});

sifinc.service('game', function() {
    this.selectedScreen = 0;

    this.setSelectedScreen = function(value) {
        this.selectedScreen = value;
    }
    this.getSelectedScreen = function() {
        return this.selectedScreen;
    }
});

sifinc.service('player', function() {
    this.level = 0;
    this.gold = 0;
    this.friendPoints = 0;
    this.loveca = 0;
    this.experience = {cur: 0, next: 6};
    this.lp = {cur: 25, max: 25};

    this.gainExperience = function(value) {
        this.experience.cur += value;
        while (this.experience.cur >= this.experience.next) {
            this.gainLevel(1);
            this.experience.cur -= this.experience.next;
            this.experience.next = this.getExperienceToNextLevel(this.level + 1);
            this.lp.cur += this.lp.max;
        }
    }
    this.getExperienceToNextLevel = function(value) {
        this.exp = 0;
        if (value >= 34) {
            this.exp = Math.round(34.45 * value - 551);
            if (value < 99) {
                this.exp = Math.round(this.exp / 2);
            }
        }
        else {
            if (value == 1) return 6;
            if (value == 2) return 6;
            if (value == 3) return 8;
            if (value == 4) return 10;
            if (value == 5) return 13;
            if (value == 6) return 16;
            if (value == 7) return 20;
            if (value == 8) return 24;
            if (value == 9) return 28;
            if (value == 10) return 34;
            if (value == 11) return 39;
            if (value == 12) return 46;
            if (value == 13) return 52;
            if (value == 14) return 60;
            if (value == 15) return 68;
            if (value == 16) return 76;
            if (value == 17) return 85;
            if (value == 18) return 94;
            if (value == 19) return 104;
            if (value == 20) return 115;
            if (value == 21) return 125;
            if (value == 22) return 137;
            if (value == 23) return 149;
            if (value == 24) return 162;
            if (value == 25) return 174;
            if (value == 26) return 188;
            if (value == 27) return 203;
            if (value == 28) return 217;
            if (value == 29) return 232;
            if (value == 30) return 247;
            if (value == 31) return 264;
            if (value == 32) return 281;
            if (value == 33) return 298;
        }
        return this.exp;
    }
    this.getExperience = function() {
        return this.experience;
    }

    this.gainLevel = function(value) {
        while (value > 0) {
            this.level++;
            if (this.level <= 300) {
                if (this.level % 2 == 0) {
                    this.increaseMaxLp(1);
                }
            }
            else {
                if (this.level % 3 == 0) {
                    this.increaseMaxLp(1);
                }
            }
            this.addLp(this.lp.max);
            value--;
        }
    }
    this.getLevel = function() {
        return this.level;
    }

    this.addGold = function(value) {
        this.gold += value;
    }
    this.useGold = function(value) {
        if (this.gold >= value) {
            this.gold -= value;
        }
    }
    this.getGold = function() {
        return this.gold;
    }

    this.addFriendPoints = function(value) {
        this.friendPoints += value;
    }
    this.useFriendPoints = function(value) {
        if (this.friendPoints >= value) {
            this.friendPoints -= value;
        }
    }
    this.getFriendPoints = function() {
        return this.friendPoints;
    }

    this.addLoveca = function(value) {
        this.loveca += value;
    }
    this.useLoveca = function(value) {
        if (this.loveca >= value) {
            this.loveca -= value;
        }
    }
    this.getLoveca = function() {
        return this.loveca;
    }

    this.addLp = function(value) {
        this.lp.cur += value;
    }
    this.useLp = function(value) {
        if (this.lp.cur >= value) {
            this.lp.cur -= value;
        }
    }
    this.increaseMaxLp = function(value) {
        this.lp.max += value;
    }
    this.getLp = function() {
        return this.lp;
    }
});

sifinc.service('songs', function(player, cards, skill) {
    this.selectedDifficulty = 0;
    this.songCost = [5,10,15,25,25];
    this.experienceGain = [12,26,46,83,83];
    this.selectedSong = 0;
    this.lastCombo = [0,0,0,0,0];
    this.lastScore = 0;
    this.songList = [
        {name: "Bokura no LIVE Kimi to no LIFE", attribute: 1, cover: "songs/BokuLiveKimiLife.jpg", stats: [
            {stars: 1, notes: 95, score: {
                best: 0, bestRank: 0, requirements: [8550, 12825, 17100, 21375], prize: [{type: 0, value: 500}, {type: 0, value: 900}, {type: 0, value: 1500}, {type: 0, value: 2500}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [29, 48, 67, 95], prize: [{type: 0, value: 250}, {type: 0, value: 500}, {type: 0, value: 750}, {type: 0, value: 1250}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [1, 5, 10, 20], prize: [{type: 1, value: 25}, {type: 1, value: 50}, {type: 1, value: 75}, {type: 1, value: 100}]
            }},

            {stars: 4, notes: 120, score: {
                best: 0, bestRank: 0, requirements: [13440, 26880, 33600, 40320], prize: [{type: 0, value: 1500}, {type: 0, value: 2500}, {type: 0, value: 5000}, {type: 0, value: 7500}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [36, 60, 84, 120], prize: [{type: 0, value: 1000}, {type: 0, value: 1500}, {type: 0, value: 2000}, {type: 0, value: 3000}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [5, 10, 20, 40], prize: [{type: 1, value: 100}, {type: 1, value: 150}, {type: 1, value: 200}, {type: 1, value: 300}]
            }},

            {stars: 6, notes: 181, score: {
                best: 0, bestRank: 0, requirements: [25340, 63350, 76020, 88690], prize: [{type: 0, value: 5000}, {type: 0, value: 8000}, {type: 0, value: 12000}, {type: 1, value: 1000}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [54, 91, 127, 181], prize: [{type: 0, value: 4000}, {type: 0, value: 7000}, {type: 0, value: 10000}, {type: 1, value: 1000}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [10, 20, 40, 100], prize: [{type: 1, value: 300}, {type: 1, value: 500}, {type: 1, value: 700}, {type: 2, value: 1}]
            }},

            {stars: 9, notes: 348, score: {
                best: 0, bestRank: 0, requirements: [68208, 187572, 204624, 221676], prize: [{type: 0, value: 5000}, {type: 0, value: 8000}, {type: 0, value: 12000}, {type: 1, value: 1000}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [105, 174, 244, 348], prize: [{type: 0, value: 7000}, {type: 0, value: 10000}, {type: 1, value: 500}, {type: 2, value: 1}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [15, 30, 60, 120], prize: [{type: 1, value: 300}, {type: 1, value: 500}, {type: 1, value: 1000}, {type: 2, value: 1}]
            }},

            {stars: 11, notes: 697, score: {
                best: 0, bestRank: 0, requirements: [147067, 368016, 441201, 515083], prize: [{type: 0, value: 10000}, {type: 1, value: 500}, {type: 2, value: 1}, {type: 2, value: 1}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [210, 349, 488, 697], prize: [{type: 0, value: 10000}, {type: 1, value: 500}, {type: 2, value: 1}, {type: 2, value: 1}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [15, 30, 60, 150], prize: [{type: 1, value: 500}, {type: 1, value: 1000}, {type: 2, value: 1}, {type: 2, value: 1}]
            }},
        ]},

        {name: "Yuujou No Change", attribute: 2, cover: "songs/Yuujou.jpg", stats: [
            {stars: 1, notes: 91, score: {
                best: 0, bestRank: 0, requirements: [8281, 12422, 16562, 20703], prize: [{type: 0, value: 500}, {type: 0, value: 900}, {type: 0, value: 1500}, {type: 0, value: 2500}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [27, 46, 64, 91], prize: [{type: 0, value: 250}, {type: 0, value: 500}, {type: 0, value: 750}, {type: 0, value: 1250}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [1, 5, 10, 20], prize: [{type: 1, value: 25}, {type: 1, value: 50}, {type: 1, value: 75}, {type: 1, value: 100}]
            }},

            {stars: 4, notes: 125, score: {
                best: 0, bestRank: 0, requirements: [14250, 28500, 35625, 42750], prize: [{type: 0, value: 1500}, {type: 0, value: 2500}, {type: 0, value: 5000}, {type: 0, value: 7500}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [38, 63, 88, 125], prize: [{type: 0, value: 1000}, {type: 0, value: 1500}, {type: 0, value: 2000}, {type: 0, value: 3000}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [5, 10, 20, 40], prize: [{type: 1, value: 100}, {type: 1, value: 150}, {type: 1, value: 200}, {type: 1, value: 300}]
            }},

            {stars: 6, notes: 204, score: {
                best: 0, bestRank: 0, requirements: [29172, 72930, 87516, 102102], prize: [{type: 0, value: 5000}, {type: 0, value: 8000}, {type: 0, value: 12000}, {type: 1, value: 1000}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [61, 102, 143, 204], prize: [{type: 0, value: 4000}, {type: 0, value: 7000}, {type: 0, value: 10000}, {type: 1, value: 1000}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [10, 20, 40, 100], prize: [{type: 1, value: 300}, {type: 1, value: 500}, {type: 1, value: 700}, {type: 2, value: 1}]
            }},

            {stars: 9, notes: 359, score: {
                best: 0, bestRank: 0, requirements: [71800, 197450, 215400, 233350], prize: [{type: 0, value: 5000}, {type: 0, value: 8000}, {type: 0, value: 12000}, {type: 1, value: 1000}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [108, 180, 252, 359], prize: [{type: 0, value: 7000}, {type: 0, value: 10000}, {type: 1, value: 500}, {type: 2, value: 1}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [15, 30, 60, 120], prize: [{type: 1, value: 300}, {type: 1, value: 500}, {type: 1, value: 1000}, {type: 2, value: 1}]
            }},

            {stars: 11, notes: 640, score: {
                best: 0, bestRank: 0, requirements: [135040, 337920, 405120, 472960], prize: [{type: 0, value: 10000}, {type: 1, value: 500}, {type: 2, value: 1}, {type: 2, value: 1}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [192, 320, 448, 640], prize: [{type: 0, value: 10000}, {type: 1, value: 500}, {type: 2, value: 1}, {type: 2, value: 1}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [15, 30, 60, 150], prize: [{type: 1, value: 500}, {type: 1, value: 1000}, {type: 2, value: 1}, {type: 2, value: 1}]
            }},
        ]},

        {name: "Snow halation", attribute: 2, cover: "songs/SnowHalation.jpg", stats: [
            {stars: 1, notes: 81, score: {
                best: 0, bestRank: 0, requirements: [7452, 11178, 14904, 18630], prize: [{type: 0, value: 500}, {type: 0, value: 900}, {type: 0, value: 1500}, {type: 0, value: 2500}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [24, 41, 57, 81], prize: [{type: 0, value: 250}, {type: 0, value: 500}, {type: 0, value: 750}, {type: 0, value: 1250}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [1, 5, 10, 20], prize: [{type: 1, value: 25}, {type: 1, value: 50}, {type: 1, value: 75}, {type: 1, value: 100}]
            }},

            {stars: 4, notes: 139, score: {
                best: 0, bestRank: 0, requirements: [16124, 32248, 40310, 48372], prize: [{type: 0, value: 1500}, {type: 0, value: 2500}, {type: 0, value: 5000}, {type: 0, value: 7500}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [42, 70, 97, 139], prize: [{type: 0, value: 1000}, {type: 0, value: 1500}, {type: 0, value: 2000}, {type: 0, value: 3000}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [5, 10, 20, 40], prize: [{type: 1, value: 100}, {type: 1, value: 150}, {type: 1, value: 200}, {type: 1, value: 300}]
            }},

            {stars: 6, notes: 206, score: {
                best: 0, bestRank: 0, requirements: [30076, 75190, 90228, 105266], prize: [{type: 0, value: 5000}, {type: 0, value: 8000}, {type: 0, value: 12000}, {type: 1, value: 1000}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [62, 103, 144, 206], prize: [{type: 0, value: 4000}, {type: 0, value: 7000}, {type: 0, value: 10000}, {type: 1, value: 1000}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [10, 20, 40, 100], prize: [{type: 1, value: 300}, {type: 1, value: 500}, {type: 1, value: 700}, {type: 2, value: 1}]
            }},

            {stars: 9, notes: 355, score: {
                best: 0, bestRank: 0, requirements: [69580, 191345, 208740, 226135], prize: [{type: 0, value: 5000}, {type: 0, value: 8000}, {type: 0, value: 12000}, {type: 1, value: 1000}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [107, 178, 249, 355], prize: [{type: 0, value: 7000}, {type: 0, value: 10000}, {type: 1, value: 500}, {type: 2, value: 1}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [15, 30, 60, 120], prize: [{type: 1, value: 300}, {type: 1, value: 500}, {type: 1, value: 1000}, {type: 2, value: 1}]
            }},

            {stars: 11, notes: 551, score: {
                best: 0, bestRank: 0, requirements: [116261, 290928, 348783, 407189], prize: [{type: 0, value: 10000}, {type: 1, value: 500}, {type: 2, value: 1}, {type: 2, value: 1}]
            }, combo: {
                best: 0, bestRank: 0, requirements: [166, 276, 386, 551], prize: [{type: 0, value: 10000}, {type: 1, value: 500}, {type: 2, value: 1}, {type: 2, value: 1}]
            }, clear: {
                best: 0, bestRank: 0, requirements: [15, 30, 60, 150], prize: [{type: 1, value: 500}, {type: 1, value: 1000}, {type: 2, value: 1}, {type: 2, value: 1}]
            }},
        ]}
    ];

    this.selectDifficulty = function(value) {
        if (value >= 0 && value <= 4) {
            this.selectedDifficulty = value;
        }
    }
    this.getDifficulty = function() {
        return this.selectedDifficulty;
    }
    this.getDifficultyName = function(value) {
        if (value == 0) return "Easy";
        if (value == 1) return "Normal";
        if (value == 2) return "Hard";
        if (value == 3) return "Expert";
        if (value == 4) return "Master";
    }

    this.getSongCost = function() {
        return this.songCost[this.selectedDifficulty];
    }
    this.changeSelectedSong = function(value) {
        this.selectedSong += value;
    }
    this.getSelectedSongValue = function() {
        return this.selectedSong;
    }
    this.getSelectedSong = function() {
        return this.songList[this.selectedSong];
    }

    this.setScore = function(score, value) {
        if (value > score.best) {
            score.best = value;
            for (i = score.bestRank; i < score.requirements.length; i++) {
                if (score.best >= score.requirements[i]) {
                    score.bestRank = i+1;
                    if (score.prize[i].type == 0) {
                        player.addGold(score.prize[i].value);
                    }
                    if (score.prize[i].type == 1) {
                        player.addFriendPoints(score.prize[i].value);
                    }
                    if (score.prize[i].type == 2) {
                        player.addLoveca(score.prize[i].value);
                    }
                }
            }
        }
    }
    this.setCombo = function(combo, value) {
        if (value > combo.best) {
            combo.best = value;
            for (i = combo.bestRank; i < combo.requirements.length; i++) {
                if (combo.best >= combo.requirements[i]) {
                    combo.bestRank = i+1;
                    if (combo.prize[i].type == 0) {
                        player.addGold(combo.prize[i].value);
                    }
                    if (combo.prize[i].type == 1) {
                        player.addFriendPoints(combo.prize[i].value);
                    }
                    if (combo.prize[i].type == 2) {
                        player.addLoveca(combo.prize[i].value);
                    }
                }
            }
        }
    }
    this.increaseClear = function(clear) {
        clear.best++;
        for (i = clear.bestRank; i < clear.requirements.length; i++) {
            if (clear.best >= clear.requirements[i]) {
                clear.bestRank = i+1;
                if (clear.prize[i].type == 0) {
                    player.addGold(clear.prize[i].value);
                }
                else if (clear.prize[i].type == 1) {
                    player.addFriendPoints(clear.prize[i].value);
                }
                else if (clear.prize[i].type == 2) {
                    player.addLoveca(clear.prize[i].value);
                }
            }
        }
    }
    this.playSong = function() {
        if (player.getLp().cur >= this.songCost[this.selectedDifficulty]) {
            player.useLp(this.songCost[this.selectedDifficulty]);
            player.gainExperience(this.experienceGain[this.selectedDifficulty]);

            baseScore = 0;
            cardList = cards.getCardList();
            for (i = 0; i < cardList.length; i++) {
                if (cardList[i].obtained[0]) {
                    cardScore = Math.pow(100 * Math.pow(10, cardList[i].rarity), 1 + cardList[i].level/100);
                    if (cardList[i].attribute == this.songList[this.selectedSong].attribute) {
                        cardScore *= 1.1;
                    }
                    if (cardList[i].obtained[1]) {
                        cardScore *= 2;
                    }
                    baseScore += cardScore;
                }
            }
            baseScore = Math.round(baseScore);

            count = [0, 0, 0, 0, 0];
            maxCombo = 0;
            curCombo = 0;
            for (i = 0; i < this.songList[this.selectedSong].stats[this.selectedDifficulty].notes; i++) {
                roll = Math.random()*100;
                for (j = 0; j < skill.getHitChance().length; j++) {
                    roll -= skill.getHitChance()[j];
                    if (roll < 0) {
                        count[j]++;
                        if (j < 2) {
                            curCombo++;
                        }
                        else {
                            if (curCombo > maxCombo) {
                                maxCombo = curCombo;
                            }
                        }
                        break;
                    }
                }
            }
            
            finalScore = Math.round(baseScore * (1.5 * count[0] + 1.25 * count[1] + count[2] + 0.5 * count[3])/this.songList[this.selectedSong].stats[this.selectedDifficulty].notes);

            this.lastCombo = count;
            this.lastScore = finalScore;

            this.setScore(this.songList[this.selectedSong].stats[this.selectedDifficulty].score, finalScore);
            this.setCombo(this.songList[this.selectedSong].stats[this.selectedDifficulty].combo, maxCombo);
            this.increaseClear(this.songList[this.selectedSong].stats[this.selectedDifficulty].clear);

            player.addGold(1000);
            player.addFriendPoints(10);
            skill.addExperience(3*count[0] + 2*count[1] + count[2]);
        }
    }

    this.getLastCombo = function() {
        return this.lastCombo;
    }

    this.getLastScore = function() {
        return this.lastScore;
    }
});

sifinc.service('cards', function() {
    this.cardList = [
        {name: "Shizuku Osaka", image: "cards/1.png", idolImage: "cards/1_t.png", rarity: 0, attribute: 1, obtained: [true, false], level: 1, ilvl: 30, maxlvl: 40},
        {name: "Coco Miyashita", image: "cards/2.png", idolImage: "cards/2_t.png", rarity: 0, attribute: 2, obtained: [true, false], level: 1, ilvl: 30, maxlvl: 40},
        {name: "Yuu Aizawa", image: "cards/3.png", idolImage: "cards/3_t.png", rarity: 0, attribute: 3, obtained: [true, false], level: 1, ilvl: 30, maxlvl: 40},
        {name: "Marika Ichinose", image: "cards/4.png", idolImage: "cards/4_t.png", rarity: 0, attribute: 1, obtained: [true, false], level: 1, ilvl: 30, maxlvl: 40},
        {name: "Sana Yuki", image: "cards/5.png", idolImage: "cards/5_t.png", rarity: 0, attribute: 2, obtained: [true, false], level: 1, ilvl: 30, maxlvl: 40},
        {name: "Fumie Nishimura", image: "cards/6.png", idolImage: "cards/6_t.png", rarity: 0, attribute: 3, obtained: [true, false], level: 1, ilvl: 30, maxlvl: 40},
        {name: "Minami Nagayama", image: "cards/7.png", idolImage: "cards/7_t.png", rarity: 0, attribute: 1, obtained: [true, false], level: 1, ilvl: 30, maxlvl: 40},
        {name: "Christina", image: "cards/8.png", idolImage: "cards/8_t.png", rarity: 0, attribute: 2, obtained: [true, false], level: 1, ilvl: 30, maxlvl: 40},
        {name: "Akemi Kikuchi", image: "cards/9.png", idolImage: "cards/9_t.png", rarity: 0, attribute: 3, obtained: [true, false], level: 1, ilvl: 30, maxlvl: 40},
        {name: "Iruka Suda", image: "cards/10.png", idolImage: "cards/10_t.png", rarity: 0, attribute: 1, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Aya Sugisaki", image: "cards/11.png", idolImage: "cards/11_t.png", rarity: 0, attribute: 2, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Yuri Midou", image: "cards/12.png", idolImage: "cards/12_t.png", rarity: 0, attribute: 3, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Reine Saeki", image: "cards/13.png", idolImage: "cards/13_t.png", rarity: 0, attribute: 1, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Ayumi Tori", image: "cards/14.png", idolImage: "cards/14_t.png", rarity: 0, attribute: 2, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Rika Kamiya", image: "cards/15.png", idolImage: "cards/15_t.png", rarity: 0, attribute: 3, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Nanaka Morishima", image: "cards/16.png", idolImage: "cards/16_t.png", rarity: 0, attribute: 1, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Seira Kujo", image: "cards/17.png", idolImage: "cards/17_t.png", rarity: 0, attribute: 2, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Kanata Konoe", image: "cards/18.png", idolImage: "cards/18_t.png", rarity: 0, attribute: 3, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Haruka Konoe", image: "cards/19.png", idolImage: "cards/19_t.png", rarity: 0, attribute: 1, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Saki Shimozono", image: "cards/20.png", idolImage: "cards/20_t.png", rarity: 0, attribute: 2, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Sachiko Tanaka", image: "cards/21.png", idolImage: "cards/21_t.png", rarity: 0, attribute: 3, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Kasane Hasekura", image: "cards/22.png", idolImage: "cards/22_t.png", rarity: 0, attribute: 1, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Ru Tatara", image: "cards/23.png", idolImage: "cards/23_t.png", rarity: 0, attribute: 2, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Akiru Shinomiya", image: "cards/24.png", idolImage: "cards/24_t.png", rarity: 0, attribute: 3, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Mizuki Kikkawa", image: "cards/25.png", idolImage: "cards/25_t.png", rarity: 0, attribute: 1, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Nagi Shiraki", image: "cards/26.png", idolImage: "cards/26_t.png", rarity: 0, attribute: 2, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40},
        {name: "Yumi Fujishiro", image: "cards/27.png", idolImage: "cards/27_t.png", rarity: 0, attribute: 3, obtained: [false, false], level: 0, ilvl: 30, maxlvl: 40}
    ];

    this.getCardList = function() {
        return this.cardList;
    }
    this.increaseLevel = function(card) {
        if (this.cardList[card].level < this.cardList[card].maxlvl) {
            this.cardList[card].level++;
            if (this.cardList[card].level == 1) {
                this.cardList[card].obtained[0] = true;
            }
            else if (this.cardList[card].level == this.cardList[card].ilvl) {
                this.cardList[card].obtained[1] = true;
            }
        }
    }
});

sifinc.service('scout', function(player, cards) {
    this.regularScoutingBox = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
    this.latestScout = [];

    this.regularScout = function(value, cost) {
        this.latestScout = [];
        if (player.getFriendPoints() >= cost) {
            player.useFriendPoints(cost);
            for (i = 0; i < value; i++) {
                roll = Math.floor(Math.random() * this.regularScoutingBox.length);
                cards.increaseLevel(roll);
                this.latestScout.push(roll);
            }
        }
    }

    this.getLatestScout = function() {
        return this.latestScout;
    }
});

sifinc.service('skill', function() {
    this.level = 1;
    this.experience = {cur: 0, next: 100};
    this.clearedLives = 0;
    this.hitChance = [3, 7, 15, 25, 50];

    this.addLevel = function(value) {
        this.level += value;
    }
    this.getLevel = function() {
        return this.level;
    }
    this.addExperience = function(value) {
        this.experience.cur += value;
        while (this.experience.cur >= this.experience.next) {
            this.experience.cur -= this.experience.next;
            this.addLevel(1);
            //this.experience.next = 50/3 * (Math.pow(this.level + 1, 3) - 6 * Math.pow(this.level + 1, 2) + 17 * (this.level + 1) - 12);
            this.experience.next = 50 * (Math.pow(this.level + 1, 2) - 5 * (this.level + 1) + 8);
            for (i = 1; i < this.hitChance.length; i++) {
                this.hitChance[i-1] += Math.ceil(this.hitChance[i]/10);
                this.hitChance[i] -= Math.ceil(this.hitChance[i]/10);
            }
        }
    }
    this.getExperience = function() {
        return this.experience;
    }

    this.addClearedLives = function(value) {
        this.clearedLives += value;
    }
    this.getClearedLives = function() {
        return this.clearedLives;
    }

    this.getHitChance = function() {
        return this.hitChance;
    }
});