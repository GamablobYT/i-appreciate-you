function playAudio(filePath) {
    const audio = new Audio(filePath);
    audio.play();
    console.log("Playing audio file: " + filePath);
}

function checkText(inputText) {
    //const targetString = "orngchimkin";
    const targetString = ["gamablobyt", "orngchimkin", "_harshitgupta1", "_srai_7", "sparsh_agrawal12", "sonalchaudhary_", "squirtlesquad_", "satyeahhhh", "devanshu_pb22", "divyamx7", "raghavbansal161", "karan__chhabra_", "akshavya.agwl", "aryan.gupta_30", "vaibhav.3627", "arshiyasethi__", "_ajayynagpal"];
    if (targetString.includes(inputText)) {
        return true;
    }
    else {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('myForm');
    const heartImage = document.getElementById('heartimage');
    let startTime = null;
    var finished = false;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        var inputText = document.getElementById('username').value; // Get the input text
        if (!checkText(inputText)) {
            window.alert("Oops, the animation for your username hasn't been implemented yet :(");
            return;
        }
        else {
            finished = false;
            playAudio("audio/avaz.mp3"); // Call the playAudio function
            if (!startTime) {
                requestAnimationFrame(animate); // Start the animation
            }
        }
        
        function animate(timestamp) {
            heartImage.style.display = 'flex';
            if (!startTime) startTime = timestamp;
            const runtime = timestamp - startTime;
            const progress = Math.min(runtime / 2000, 1); // Animation lasts 4 seconds, fades in halfway through
    
            // Calculate vertical sine wave movement
            const amplitude = 50; // Amplitude of the sine wave
            const frequency = 0.5; // Frequency of the sine wave
            const yPosition = amplitude * Math.sin(frequency * runtime * Math.PI / 1000) + window.innerHeight / 2;
    
            // Update image properties
            heartImage.style.top = `${yPosition}px`;
            heartImage.style.opacity = progress < 0.5 ? progress * 2 : 1 - (progress - 0.5) * 2;
            heartImage.style.transform = `translate(-50%, -50%) scale(${progress})`; // Scale up as it fades in
    
            if (runtime < 4000) { // Continue the animation for 4 seconds
                requestAnimationFrame(animate);
            } else {
                startTime = null; // Reset startTime to allow re-animation
                finished = true;
                heartImage.style.top = '50%'; // Reset image position
                heartImage.style.left = '50%';
                heartImage.style.transform = 'translate(-50%, -50%) scale (0)'; // Reset image scale
                heartImage.style.opacity = 0; // Reset image opacity
                heartImage.style.display = 'none'; // Hide the image
            }
        }

        document.getElementById('myForm').focus();
    });

    form.disabled = false;
    document.getElementById('username').disabled = false;
    //heartImage.style.transform = 'translate(-50%, -50%) scale(0)';

    if (finished) {
        heartImage.style.transform = 'translate(-50%, -50%) scale(0) !important';
    }
});
