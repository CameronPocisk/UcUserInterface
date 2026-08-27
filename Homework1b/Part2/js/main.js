class journalEntry{
    constructor({
        note = "",
        hoursOfSleep = 0,
        wokeUp = false,
        showUp = false,
        repeat = false,
        dateLogged = new Date()// What date type lol
    }
    ){
        console.log("Constructing journal entry");
        // Set the vals from constructor
        this.note = note;
        this.hoursOfSleep = hoursOfSleep;
        this.wokeUp = wokeUp;
        this.showUp = showUp;
        this.repeat = repeat;
        this.dateLogged = dateLogged;
    }
    
    setNote(Note = ""){
        this.note = Note
        console.log("this note: " + this.note);
    }
    
    setHoursOfSleep(HoursOfSleep = 0){
        this.hoursOfSleep = HoursOfSleep
        console.log("this hoursOfSleep: " + this.hoursOfSleep);
    }
    
    // Ik this can probably fall out of sync but I like this imple a little more
    setWakeUp(){
        this.wakeUp = !this.wakeUp;
        console.log("this wakeUp: " + this.wakeUp);
    }
    
    setShowUp(){
        this.showUp = !this.showUp;
        console.log("this showUp: " + this.showUp);
    }
    
    setRepeat(){
        this.repeat = !this.repeat;
        console.log("this repeat: " + this.repeat);
    }
}


function submitEntry(entries, instance){
    console.log("in submit");
    entries += instance
}

function getInsights(entries){
    // Metrics we are gonna find.
    var avgSleep = 0;
    var timesHappy = 0;
    var timesSad = 0;
    var timesSleepy = 0;
    var timesEnergetic = 0;
    for(var i = 0; i < entries.length-1; i++){
        console.log("entry: " + i);
        avgSleep += entries[i].hoursOfSleep;
        timesHappy += entries.note.toLowerCase().includes("happy");
        timesSad += entries.note.toLowerCase().includes("sad");
        timesSleepy += entries.note.toLowerCase().includes("sleepy");
        timesEnergetic += entries.note.toLowerCase().includes("energetic");
    }
    avgSleep = avgSleep / entries.length;
    console.log("avgSleep: " + avgSleep);
    console.log("Times Happy: " + timesHappy)
}

function main(){
    console.log("Running p2 main");

    // Pre-Generated entries (Could map but keeping this proj simple)
    var entries = [];
    const example1 = new journalEntry("Day one", 8, true, true , false);
    const example2 = new journalEntry("sad and energetic", 8, true, false , false);
    const example3 = new journalEntry("sleepy but happy", 8, false, false , true);
    submitEntry(entries, example1);
    submitEntry(entries, example2);
    submitEntry(entries, example3);

    var instance = new journalEntry({}); // Current one

    // Set up event listeners querySel for one class instance, Id for specific (function(){} bc parames)
    document.querySelector('.note').addEventListener("keydown", 
        function(){instance.setNote(document.querySelector('.note').value);} );
    document.querySelector('.hoursOfSleep').addEventListener("change", 
        function(){instance.setHoursOfSleep(document.querySelector('.hoursOfSleep').value);} );
    document.getElementById('wakeUp').addEventListener("change", function(){instance.setWakeUp();} );
    document.getElementById('showUp').addEventListener("change", function(){instance.setShowUp();} );
    document.getElementById('repeat').addEventListener("change", function(){instance.setRepeat();} );
    document.querySelector('.submitEntryButton').addEventListener("click", function(){submitEntry(instance);} );

    // Insights portion

    // Events for initial and updated insights
    window.addEventListener("load", function(){ getInsights(entries) });
    document.querySelector('.submitEntryButton').addEventListener("click", function(){ getInsights(entries);} ); // does this include the newest one? could sleep if no

}

main();