const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzZiZDk0Njc3Yzk4NmRjZDFmZjI3OGM3MzgxYjk2YjhhLTE1NDQ3ODE5NDEiLCJpc3MiOiJTSzZiZDk0Njc3Yzk4NmRjZDFmZjI3OGM3MzgxYjk2YjhhIiwic3ViIjoiQUNkMmVjMDBkM2Q0MTI1MTdkMTYyYTQ5NzQxZTMxODQyYSIsImV4cCI6MTU0NDc4NTU0MSwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiQUNkMmVjMDBkM2Q0MTI1MTdkMTYyYTQ5NzQxZTMxODQyYSIsInZpZGVvIjp7InJvb20iOiJIYWNrYXRob24ifX19.96YfXdKC91n1Nc39I5iJ_20mmnRbIv0VXeGfKlgcMY4';

Twilio.Video.connect(token, {name:'my-new-room'}).then(function(room) {
  console.log('Successfully joined a Room: ', room);
  room.on('participantConnected', function(participant) {
    console.log('A remote Participant connected: ', participant);
  })
}, function(error) {
    console.error('Unable to connect to Room: ' +  error.message);
});

Twilio.Video.createLocalVideoTrack().then(function(videoTrack) {
  console.log('videoTrack', videoTrack);
  const videoElement = videoTrack.attach();
  document.body.appendChild(videoElement);
});





