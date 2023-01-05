const oldDevices = Array.from(document.querySelectorAll('.devices'));
const namespace = document.querySelector('.title');
const energyCounter = document.querySelector('.energyAmount');
const buyButtons = Array.from(document.querySelectorAll('.button'));
const smartDevices = document.querySelectorAll('.device');
const progressBars = Array.from(document.querySelectorAll('.progress'));
const passiveEnergyCounter = document.querySelector('#passiveEnergyCounter');
const pictures = document.querySelectorAll('.olddevice');

alert("You just bought a brand new Google Home. You love talking to it and it has become one of your closest confiances. Life has become much brighter for you and your new home companion. ");
alert("However...each day passes with you wondering what more can Google Home do? What more can you achieve in this household? How much energy can you save with technologies like smart devices?");
alert("Fear not homeowner. We acknowledge your curiosity! Every energy you save in this household will be converted into currency which can be used to buy new home devices. Collect all the products in our store and unlock your utopia now!");


const addName = (e) => {
  let name = prompt("Your name: ");

  //Check if a name is entered
  if (name === null || name === "" || name === " ") {
    console.log("No name was inputted");
    namespace.innerHTML = `Player's Energy Capitalist`;
  } else {
    console.log("Name was inputted");
    // Capitalize Name
    let firstLetter = name.charAt(0);
    let upperCaseLetter = firstLetter.toUpperCase();
    let capitalizedName = upperCaseLetter + name.slice(1);
    namespace.innerHTML = `${capitalizedName}'s Energy Capitalist`;
  }
}
addName();



let energysaved = 0;
let totalPassiveEnergy = 0;

const oldDeviceEnergy = [
	{name: 'window1', energy: 0},
	{name: 'window2', energy: 0},
	{name: 'wall3', energy: 0},
	{name: 'wall4', energy: 0},
	{name: 'googlehome5', energy: 10},
	{name: 'plug6', energy: 0},
	{name: 'remote7', energy: 5},
	{name: 'wall8', energy: 0},
	{name: 'lightbulb9', energy: 0},
	{name: 'thermostat10', energy: 0},
  {name: 'switch11', energy: 10},
	{name: 'door12', energy: 0},
	{name: 'floor13', energy: 0},
	{name: 'floor14', energy: 0},
	{name: 'floor15', energy: 0},
	{name: 'floor16', energy: 0},
]; 

const getRandomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * max + 4000);
}; 

const turnOnDevice = (obj) => {
	let index = oldDevices.indexOf(obj);
  obj.isOff = false;
	if (index == 6) {
		pictures[index].classList.add("active");
	}
	if (index == 10) {
		pictures[index].classList.add("active");
		pictures[8].classList.add("active");
	}
  console.log(`${obj} is now on.`);
};  

const turnOffDevice = (obj) => {
	let index = oldDevices.indexOf(obj);
  obj.isOff = true;
	
	//Google Home is now Cookie Clicker 2
	if (index == 4) {
		obj.isOff=false;
	}
  console.log(`${obj} is now off.`);
}; 

const giveEnergy = (obj) => {
  let index = oldDevices.indexOf(obj);
	let energy = oldDeviceEnergy[index].energy;

	//change picture except for thermometer and door lock bc those need to be bought!
	if (index == 6) { //TV and remote
		pictures[index].classList.remove("active");
	}
	if(index == 10) { //Lights Switch
		pictures[index].classList.remove("active");
		pictures[8].classList.remove("active");
	}
	console.log(`You have been given ${energy} energy`);
	energysaved += energy;

	setTimeout(turnOnDevice, getRandomInt(30000), obj); 
}; 

const updateBalance = () => {
  energyCounter.innerHTML = `&nbsp;${energysaved}W`
  passiveEnergyCounter.innerHTML = `&nbsp;&nbsp;${totalPassiveEnergy}W per hour (5s real time)`
} 

oldDevices.forEach((device) => {
  device.isOff = false;
  device.addEventListener('click', () => {
    if (!device.isOff) {
      turnOffDevice(device); 
      giveEnergy(device); 
      updateBalance();
      updateProgress();
			console.log(`Your total energy currency: ${energysaved}W`);
    }
  })
  //setTimeout(turnOnDevice, getRandomInt(30000), device) 
}); 

// Buy stuffz

 const smartDevicePrices = [
  {name: 'smartSwitch', price: '10', energyps: 5, bought: 0},
  {name: 'smartBulb', price: '50', energyps: 10, bought: 0},
  {name: 'smartPlug', price: '250', energyps: 25, bought: 0},
  {name: 'universalRemote', price: '1250', energyps: 100, bought: 0},
  {name: 'doorLock', price: '6250', energyps: 125, bought: 0},
  {name: 'nestThermostat', price: '31250', energyps: 250, bought: 0},
] 



const reduceBalance = (amount) => {
  energysaved -= amount;
  updateBalance();
}

const unlockItem = (item) => {
  
	let index = buyButtons.indexOf(item);
	
  let price = smartDevicePrices[index].price;
	
	if(energysaved >= price) {
		reduceBalance(price);
		//bought another item
		smartDevicePrices[index].bought += 1;
		if(index == 4){ //doorlock
			pictures[11].classList.remove("active");
		}
		if(index==5){ //thermostat
			pictures[9].classList.remove("active");
		}
	}
  
  let energyAmt = smartDevicePrices[index].energyps;
  totalPassiveEnergy += energyAmt;
  
	//after unlocking an object, set interval to add energy every 5 seconds
   (function givePassiveEnergy(obj){

  let index = buyButtons.indexOf(obj);
	let bought = smartDevicePrices[index].bought;

	if(bought >=1){
  	energysaved += energyAmt;
    updateBalance();
    updateProgress();
  
  	setTimeout(givePassiveEnergy, 5000, item);
	}
  
  })(item); 
} 

buyButtons.forEach((button) => {

	//enable the button once the progress bar is full
  button.addEventListener('click', (e) => {
        unlockItem(button);
        
				//update all progress bars and buttons after purchase
        progressBars.forEach((updateprogress) => {
          updateprogress.value = energysaved;
					let updateindex = progressBars.indexOf(updateprogress);
    			let updatebutton = buyButtons[updateindex];
					let updatemax = updateprogress.max;
					if(updateprogress.value < updatemax){
						updatebutton.disabled = true;
					}
        })
  })
	//unlock item
	
	button.addEventListener("mouseover", (e)=>{
		button.classList.add("is-hovered");
	});
	button.addEventListener("mouseout", (e)=>{
		button.classList.remove("is-hovered");
	});
})

//progress bars
function updateProgress(){
	progressBars.forEach((progress)=>{

    progress.value = energysaved;
    
		let index = progressBars.indexOf(progress);
    let button = buyButtons[index];
		let maxvalue = progress.max;
		//console.log(`progress ${index} : ${maxvalue}: ${progress.value}`);
    
		if (progress.value >= maxvalue) {
			progress.value = maxvalue;
      button.disabled = false;
		}
	});
}

