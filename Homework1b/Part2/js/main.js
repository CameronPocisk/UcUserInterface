class journalEntry{
    constructor({
        note = "",
        hoursOfSleep = 0,
        wakeUp = false,
        showUp = false,
        repeat = false,
        dateLogged = new Date()// What date type lol
    }
    ){
        // Set the vals from constructor
        this.note = note;
        this.hoursOfSleep = hoursOfSleep;
        this.wakeUp = wakeUp;
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
    
    // Ik this can probably fall out of sync or smth but I like this imple a little more
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
    // Need to pass in a copy of the current isntance or new info will update all ptrs
    entries.push({...instance});
    console.log("pushed entry length: " + entries.length);
}

function handleInsights(entries){
    console.log("getting Insights for " + entries.length + " entries");
    // Metrics to find.
    var avgSleep = 0;
    var timesHappy = 0;
    var timesWokeUp = 0;
    var timesShownUp = 0;
    var timesRepeated = 0;
    for(var i = 0; i < entries.length; i++){
        console.log("note: " + entries[i].note);
        console.log("hours of sleep: " + entries[i].hoursOfSleep);
        avgSleep += entries[i].hoursOfSleep;
        timesHappy += Boolean(entries[i].note.toLowerCase().includes("happy"));
        timesWokeUp += entries[i].wakeUp;
        console.log("wake up: " + entries[i].wakeUp);
        timesShownUp += entries[i].showUp;
        timesRepeated += entries[i].repeat;
    }

    avgSleep = avgSleep / entries.length;
    console.log("avgSleep: " + avgSleep);
    console.log("Times Happy: " + timesHappy)

    // Set the elements
    document.getElementById("avgSleep").textContent = "Average Sleep: " + avgSleep.toFixed(2); // decimal
    document.getElementById("timesHappy").textContent = "Times Happy: " + timesHappy;
    document.getElementById("timesWokeUp").textContent = "Times Woke Up: " + timesWokeUp;
    document.getElementById("timesShownUp").textContent = "Times Shown Up: " + timesShownUp;
    document.getElementById("timesRepeated").textContent = "Times Repeated: " + timesRepeated;
}

function main(){
    console.log("Running p2 main");

    // Pre-Generated entries (Could map but keeping this proj simple)
    var entries = [];
    const example1 = new journalEntry({
        note: "Day one",
        hoursOfSleep: 8,
        wakeUp: true,
        showUp: true,
        repeat: false,
    });
    const example2 = new journalEntry({
        note: "sad and energetic",
        hoursOfSleep: 10,
        wakeUp: true,
        showUp: false,
        repeat: false,
    });
    const example3 = new journalEntry({
        note: "sleepy but happy",
        hoursOfSleep: 6,
        wakeUp: true,
        showUp: true,
        repeat: true,
    });

    submitEntry(entries, example1);
    submitEntry(entries, example2);
    submitEntry(entries, example3);

    handleInsights(entries);

    var instance = new journalEntry({}); // Current one

    // Set up event listeners querySel for one class instance, Id for specific (function(){} bc parames)
    document.querySelector('.note').addEventListener("keyup",
        function(){instance.setNote(document.querySelector('.note').value);} );
    document.querySelector('.hoursOfSleep').addEventListener("change", 
        function(){instance.setHoursOfSleep(Number(document.querySelector('.hoursOfSleep').value));} );
    document.getElementById('wakeUp').addEventListener("change", function(){instance.setWakeUp();} );
    document.getElementById('showUp').addEventListener("change", function(){instance.setShowUp();} );
    document.getElementById('repeat').addEventListener("change", function(){instance.setRepeat();} );
    document.querySelector('.submitEntryButton').addEventListener("click", function(){submitEntry(entries, instance);} );

    // Insights portion
    // window.addEventListener("load", function(){ handleInsights(entries) });
    document.querySelector('.submitEntryButton').addEventListener("click", function(){ handleInsights(entries);} ); // does this include the newest one? could sleep if no
}

main();