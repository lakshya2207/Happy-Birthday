function getLoudness() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
      const audioContext = new AudioContext();
      const mediaStreamSource = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      mediaStreamSource.connect(analyser);

      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function update() {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        dataArray.forEach(value => sum += value);
        const average = sum / bufferLength;

        // Map the average loudness to a value between 1 and 10
        var loudnessValue = Math.round((average / 255) * 9) + 1;
        console.log('Loudness:', loudnessValue);

        if (loudnessValue > 20) {
          const candles = document.getElementById('candles');
          candles.lastChild.remove()

        }
        if (loudnessValue > 30) {
          const candles = document.getElementById('candles');
          candles.lastChild.remove()
          candles.lastChild.remove()

        }
        
        if (loudnessValue > 4) {
          const candles = document.getElementById('candles');
          candles.lastChild.remove()
          candles.lastChild.remove()
          candles.lastChild.remove()
          candles.lastChild.remove()

        }

      }

      setInterval(update, 100);
    })
    .catch(function (err) {
      console.error('Error capturing audio:', err);
    });
}

// Call the function to start capturing audio and calculating loudness
getLoudness();

document.getElementById('age').addEventListener('change', function () {
  const age = parseInt(this.value, 10);
  const candles = document.getElementById('candles');
  candles.innerHTML = ''; // Clear previous candles

  const cakeImg = document.createElement('img');
  cakeImg.src = './download.png';
  // cakeImg.width = 200;
  // cakeImg.height = 200;
  // candles.appendChild(cakeImg);

  for (let i = 0; i < age; i++) {
    const candleImg = document.createElement('img');
    candleImg.src = './download.png';
    candleImg.width = 200;
    candleImg.height = 100;
    candleImg.style.position = 'absolute';
    candleImg.style.bottom = '0';
    candleImg.style.left = `${(i + 1) * (200 / (age + 1)) - 10}px`; // Position candles evenly
    candles.appendChild(candleImg);
  }
});



