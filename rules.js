class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); 
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); 
    }
}

var VisitCount = 0;

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; 
        this.engine.show(locationData.Body); 
        if (locationData.VisitCheck == VisitCount) {
            this.engine.show(locationData.PicCollect);
            if(VisitCount == 0){
                for(let names of this.engine.storyData.Locations.Gate.Checklist) {
                    this.engine.show(names.Name);
                }
            }
            VisitCount++;
        }
        if(locationData.Choices) {  
            for(let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice); 
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice.Text == "Smell the flowers"){
            this.engine.show(choice.Prompt);
            this.engine.gotoScene(Location, choice.Target);
        }
        else if(choice.Target == "RideoutFountain") {
            this.engine.show("&gt;"+ choice.Text);
            this.engine.gotoScene(Rideout, choice.Target);
        }
        else if(choice.Target == "DutchWindmill") {
            this.engine.show("&gt;"+ choice.Text);
            this.engine.gotoScene(Windmill, choice.Target);
        }
        else if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        }
        else {
            this.engine.gotoScene(End);
        }
    }
}

class Rideout extends Location {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; 
        this.engine.show(locationData.Body);
        if(VisitCount == 6){
            this.engine.show(locationData.PicCollect);
            for(let rideoutAltChoice of locationData.AltChoices) {
                this.engine.addChoice(rideoutAltChoice.Text, rideoutAltChoice);
            }
        }
        else {
            for(let rideoutChoice of locationData.Choices) {
                this.engine.addChoice(rideoutChoice.Text, rideoutChoice); 
            }
        }
    }

    handleChoice(choice) {
        if(choice) {
            if(VisitCount == 6) {
                VisitCount++;
                this.engine.show("&gt; "+choice.PicCollectExt);
                this.engine.gotoScene(Rideout, choice.Target);
            }
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        }
        else {
            this.engine.gotoScene(End);
        }
    }
}

class Windmill extends Location {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; 
        this.engine.show(locationData.Body);
        for(let choice of locationData.Choices) {
            this.engine.addChoice(choice.Text, choice);
        }
        if (VisitCount == 12) {
            this.engine.show(locationData.PicCollect);
            this.engine.addChoice("Join Cookout");
        }
        else {
            for(let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice); 
            }
        }
    }

    handleChoice(choice) {
        if(choice.Text == "Smell the flowers"){
            this.engine.show(choice.Prompt);
            this.engine.gotoScene(Windmill, choice.Target);
        }
        else if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        }
        else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("Though it may have been tasking and not the easiest, you can now join your friends and family after spending a nice and eventful day at Golden Gate Park.");
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');
