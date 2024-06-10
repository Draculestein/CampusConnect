document.addEventListener("DOMContentLoaded", function() {
  loadFormData('formPersonalInfo');
  loadFormData('formAccomplishmentsOne');
  loadFormData('formAccomplishmentsTwo');
  loadFormData('formFinalization');
  
  const selectedPageIndex = localStorage.getItem('selectedPageIndex');
  if (selectedPageIndex !== null) {
    const pages = document.querySelectorAll('.page');
    const pageLinks = document.querySelectorAll('.page-link');
    pages.forEach((page, index) => {
      if (index === parseInt(selectedPageIndex)) {
        page.classList.add('active');
        pageLinks[index].classList.add('active');
      } else {
        page.classList.remove('active');
        pageLinks[index].classList.remove('active');
      }
    });
  }
  setTimeout(hidePreloader, 800);
});

function hidePreloader() {
  const preloader = document.querySelector(".preloader");
  preloader.classList.add("hidden");
  showPageContent();
}

function showPageContent() {
  const content = document.getElementById("container");
  content.style.visibility = "visible";
  content.style.opacity = "1";
}

let slideIndex = 0;
const slideContainer = document.querySelector('.slide-container');
const navItems = document.querySelectorAll('.nav-item');

function goToSlide(index) {
  if (index > slideIndex && !validateForm(getFormIdBySlideIndex(slideIndex))) {
    return;
  }
  if (index === 2 && !validateForm('formAccomplishmentsTwo')) {
    return;
  }
  slideContainer.style.transform = `translateX(-${index * 20}%)`;
  navItems[slideIndex].classList.remove('active');
  navItems[index].classList.add('active');
  slideIndex = index;
  localStorage.setItem('selectedPageIndex', slideIndex);
}

function getFormIdBySlideIndex(index) {
  switch (index) {
    case 0:
      return 'formPersonalInfo';
    case 1:
      return 'formAccomplishmentsOne';
    case 2:
      return 'formAccomplishmentsTwo';
    case 3:
      return 'formFinalization';
    default:
      return '';
  }
}

function previousSlide() {
  if (slideIndex > 0) {
    goToSlide(slideIndex - 1);
  }
}

function selectOption(option) {
  var colNum = option.id.slice(0, 1)
  var rowNum = option.id.slice(-1)
  var otherRowNum = '0'
  if (rowNum == '0')
    otherRowNum = '2'
  var otherOption = document.getElementById(colNum + '-' + otherRowNum)
  if (otherOption.classList.contains('selected')) {
    otherOption.classList.remove('selected');
  }
  option.classList.add('selected');
}

let accomplishmentsSlideIndex = 0;
const accomplishmentsSlides = document.querySelectorAll('.accomplishments-slide-page');

function goToAccomplishmentsSlide(index) {
  accomplishmentsSlides.forEach(slide => {
    slide.style.display = 'none';
  });
  accomplishmentsSlides[index].style.display = 'block';
  accomplishmentsSlideIndex = index;
}

function goback() {
  window.history.back();
}

function validateForm(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('input, select, textarea');
  for (const input of inputs) {
    if (input.hasAttribute('required') && !input.value) {
      alert('Please fill in all required fields.');
      return false;
    }
  }
  saveFormData(formId);
  return true;
}

function validateAccomplishmentsOne() {
  if (validateForm('formAccomplishmentsOne')) {
    goToAccomplishmentsSlide(1);
  }
}

function validateAccomplishmentsTwo() {
  if (validateForm('formAccomplishmentsTwo')) {
    goToSlide(2);
  }
}

function validateFinalization() {
  if (validateForm('formFinalization')) {
    showModal();
  }
}

document.getElementById('phoneCountryCode').addEventListener('change', function() {
  var phoneNumberInput = document.getElementById('phoneNumber');
  if (this.value === '+62') {
    phoneNumberInput.placeholder = '813-1993-2377';
  } else {
    phoneNumberInput.placeholder = '123-456-7890';
  }
});

function validateCountryInput() {
  var input = document.getElementById('countryRegion');
  var list = document.getElementById('countries');
  var options = list.querySelectorAll('option');
  var inputMatch = false;
  for (var i = 0; i < options.length; i++) {
    if (options[i].value.toLowerCase().startsWith(input.value.toLowerCase())) {
      inputMatch = true;
      break;
    }
  }
  if (!inputMatch || /\d/.test(input.value)) {
    input.value = input.value.slice(0, -1);
  }
}

function validateEmail() {
  var emailInput = document.getElementById('email');
  var email = emailInput.value;
  var allowedDomains = ["@gmail.com", "@icloud.com", "@outlook.com", "@yahoo.com"];
  var isValidDomain = allowedDomains.some(domain => email.endsWith(domain));
  if (!isValidDomain) {
    alert("Please enter an email address with a valid domain (gmail.com, icloud.com, outlook.com, yahoo.com).");
    emailInput.value = '';
    return false;
  }
  return true;
}

function validateEmergencyEmail() {
  var emailInput = document.getElementById('emergencyEmail');
  var email = emailInput.value;
  var allowedDomains = ["@gmail.com", "@icloud.com", "@outlook.com", "@yahoo.com"];
  var isValidDomain = allowedDomains.some(domain => email.endsWith(domain));
  if (!isValidDomain) {
    alert("Please enter an emergency email address with a valid domain (gmail.com, icloud.com, outlook.com, yahoo.com).");
    emailInput.value = '';
    return false;
  }
  return true;
}

function validateAge() {
  var birthdayInput = document.getElementById('birthday');
  var birthday = new Date(birthdayInput.value);
  var today = new Date();
  var age = today.getFullYear() - birthday.getFullYear();
  var m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  if (age < 15 || age > 50) {
    alert("Your age must be above 15 and below 50 to fill this form.");
    birthdayInput.value = '';
    return false;
  }
  return true;
}

function restrictYear() {
  var dateInput = document.getElementById('birthday');
  var dateValue = dateInput.value;
  var year = dateValue.split('-')[0];
  if (year.length > 4) {
    dateInput.value = dateValue.slice(0, 4) + dateValue.slice(4 + year.length - 4);
  }
}

document.getElementById('phoneNumber').addEventListener('input', function(event) {
  this.value = this.value.replace(/[^0-9\-]/g, '');
  if (this.value.length > 20) {
    this.value = this.value.slice(0, 20);
  }
});

document.getElementById('emergencyPhoneNumber').addEventListener('input', function(event) {
  this.value = this.value.replace(/[^0-9\-]/g, '');
  if (this.value.length > 20) {
    this.value = this.value.slice(0, 20);
  }
});

function updateProvinces(country) {
  const provinceInput = document.getElementById('province');
  const provinceList = document.getElementById('provinceList');
  provinceList.innerHTML = ''; // Clear the existing options
  if (country === 'Afghanistan') {
    provinceInput.disabled = false; // Enable the input
    const provinces = ['Badakhshan', 'Badghis', 'Baghlan', 'Balkh', 'Bamyan', 'Daykundi', 'Farah', 'Faryab', 'Ghazni', 'Ghor', 'Helmand', 'Herat', 'Jowzjan', 'Kabul', 'Kandahar', 'Kapisa', 'Khost', 'Kunar', 'Kunduz', 'Laghman', 'Logar', 'Nangarhar', 'Nimroz', 'Nuristan', 'Paktia', 'Paktika', 'Panjshir', 'Parwan', 'Samangan', 'Sar-e Pol', 'Takhar', 'Urozgan (Oruzgan)', 'Wardak', 'Zabul'];
    provinces.forEach(province => {
      const option = document.createElement('option');
      option.value = province;
      provinceList.appendChild(option);
    });
  } else if (country === 'Albania') {
  provinceInput.disabled = false; // Enable the input
  const provinces = ['Berat', 'Dibër', 'Durrës', 'Elbasan', 'Fier', 'Gjirokastër', 'Korçë', 'Kukës', 'Lezhë', 'Shkodër', 'Tiranë (Tirana)', 'Vlorë'];
  provinces.forEach(province => {
      const option = document.createElement('option');
      option.value = province;
      provinceList.appendChild(option);
  });
} else if (country === 'Algeria') {
  provinceInput.disabled = false; // Enable the input
  const provinces = ['Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Algiers (Algiers is both the capital city and a province)', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', 'M Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane'];
  provinces.forEach(province => {
      const option = document.createElement('option');
      option.value = province;
      provinceList.appendChild(option);
  });
} else if (country === 'Andorra') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Andorra la Vella', 'Canillo', 'Encamp', 'Escaldes-Engordany', 'La Massana', 'Ordino', 'Sant Julià de Lòria'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Angola') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla', 'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico', 'Namibe', 'Uíge', 'Zaire'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Antigua and Barbuda') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Saint George', 'Saint John', 'Saint Mary', 'Saint Paul', 'Saint Peter', 'Saint Philip'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Argentina') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Buenos Aires', 'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego, Antarctica, and South Atlantic Islands', 'Tucumán'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Armenia') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Aragatsotn', 'Ararat', 'Armavir', 'Gegharkunik', 'Kotayk', 'Lori', 'Shirak', 'Syunik', 'Tavush', 'Vayots Dzor', 'Yerevan'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Australia') {
provinceInput.disabled = false; // Enable the input
const provinces = ['New South Wales (NSW)', 'Victoria (VIC)', 'Queensland (QLD)', 'South Australia (SA)', 'Western Australia (WA)', 'Tasmania (TAS)', 'Australian Capital Territory (ACT)', 'Northern Territory (NT)'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Austria') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Burgenland', 'Kärnten', 'Niederösterreich', 'Oberösterreich', 'Salzburg', 'Steiermark', 'Tirol', 'Vorarlberg', 'Wien'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Azerbaijan') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Absheron', 'Agdam', 'Ganja-Gazakh', 'Guba-Khachmaz', 'Kalbajar-Lachin', 'Lankaran', 'Quba', 'Shaki-Zaqatala', 'Upper Karabakh', 'Nakhchivan'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Bahamas') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Acklins', 'Berry Islands', 'Bimini', 'Black Point', 'Cat Island', 'Central Abaco', 'Central Andros', 'Central Eleuthera', 'City of Freeport', 'Crooked Island and Long Cay', 'East Grand Bahama', 'Exuma', 'Grand Cay', 'Harbour Island', 'Hope Town', 'Inagua', 'Long Island', 'Mangrove Cay', 'Mayaguana', 'Moore\'s Island', 'North Abaco', 'North Andros', 'North Eleuthera', 'Ragged Island', 'Rum Cay', 'San Salvador and Rum Cay', 'South Abaco', 'South Andros', 'South Eleuthera', 'Spanish Wells', 'West Grand Bahama'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Bahrain') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Capital Governorate', 'Central Governorate', 'Muharraq Governorate', 'Northern Governorate'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Bangladesh') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Dhaka Division', 'Chittagong Division', 'Khulna Division', 'Rajshahi Division', 'Barisal Division', 'Sylhet Division', 'Rangpur Division', 'Mymensingh Division'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Barbados') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Christ Church', 'Saint Andrew', 'Saint George', 'Saint James', 'Saint John', 'Saint Joseph', 'Saint Lucy', 'Saint Michael', 'Saint Peter', 'Saint Philip', 'Saint Thomas'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Belarus') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Brestskaya', 'Homel\'skaya', 'Hrodzyenskaya', 'Minskaya', 'Mahilyowskaya', 'Vitsyebskaya'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Belgium') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Antwerpen', 'Oost-Vlaanderen', 'Vlaams-Brabant', 'Henegouwen', 'Luik', 'Limburg', 'Luxemburg', 'Namur', 'Waals-Brabant', 'West-Vlaanderen'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Belize') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Belize', 'Cayo', 'Corozal', 'Orange Walk', 'Stann Creek', 'Toledo'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Benin') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Alibori', 'Atakora', 'Atlantique', 'Borgou', 'Collines', 'Donga', 'Kouffo', 'Littoral', 'Mono', 'Ouémé', 'Plateau', 'Zou'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
} else if (country === 'Bhutan') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Bumthang', 'Chukha', 'Dagana', 'Gasa', 'Haa', 'Lhuntse', 'Mongar', 'Paro', 'Pemagatshel', 'Punakha', 'Samdrup Jongkhar', 'Samtse', 'Sarpang', 'Thimphu', 'Trashigang', 'Trongsa', 'Tsirang', 'Wangdue Phodrang', 'Zhemgang'];
provinces.forEach(province => {
  const option = document.createElement('option');
  option.value = province;
  provinceList.appendChild(option);
});
// } else if (country === 'Bolivia') {
provinceInput.disabled = false; // Enable the input
const departments = ['Beni', 'Chuquisaca', 'Cochabamba', 'La Paz', 'Oruro', 'Pando', 'Potosí', 'Santa Cruz', 'Tarija'];
departments.forEach(department => {
  const option = document.createElement('option');
  option.value = department;
  provinceList.appendChild(option);
});
} else if (country === 'Bosnia and Herzegovina') {
provinceInput.disabled = false; // Enable the input
const entities = ['Federation of Bosnia and Herzegovina', 'Republika Srpska'];
entities.forEach(entity => {
  const option = document.createElement('option');
  option.value = entity;
  provinceList.appendChild(option);
});
} else if (country === 'Botswana') {
provinceInput.disabled = false; // Enable the input
const districts = ['Central', 'Chobe', 'Francistown', 'Gaborone', 'Ghanzi', 'Kgalagadi', 'Kgatleng', 'Kweneng', 'Lobatse', 'Ngamiland', 'North-East', 'North-West', 'Selebi-Phikwe', 'South-East', 'Southern'];
districts.forEach(district => {
  const option = document.createElement('option');
  option.value = district;
  provinceList.appendChild(option);
});
} else if (country === 'Brazil') {
provinceInput.disabled = false; // Enable the input
const states = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'];
states.forEach(state => {
  const option = document.createElement('option');
  option.value = state;
  provinceList.appendChild(option);
});
} else if (country === 'Brunei') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Belait', 'Brunei-Muara', 'Temburong', 'Tutong'];
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});
} else if (country === 'Bulgaria') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Blagoevgrad', 'Burgas', 'Dobrich', 'Gabrovo', 'Haskovo', 'Kardzhali', 'Kyustendil', 'Lovech', 'Montana', 'Pazardzhik', 'Pernik', 'Pleven', 'Plovdiv', 'Razgrad', 'Ruse', 'Shumen', 'Silistra', 'Sliven', 'Smolyan', 'Sofia', 'Sofia City', 'Stara Zagora', 'Targovishte', 'Varna', 'Veliko Tarnovo', 'Vidin', 'Vratsa', 'Yambol'];
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});
} else if (country === 'Burkina Faso') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Balé', 'Bam', 'Banwa', 'Bazèga', 'Bougouriba', 'Boulgou', 'Boulkiemdé', 'Comoe', 'Ganzourgou', 'Gnagna', 'Gourma', 'Houet', 'Ioba', 'Kadiogo', 'Kénédougou', 'Komondjari', 'Kompienga', 'Kossi', 'Koulpélogo', 'Kouritenga', 'Kourwéogo', 'Léraba', 'Loroum', 'Mouhoun', 'Nahouri', 'Namentenga', 'Nayala', 'Noumbiel', 'Oubritenga', 'Oudalan', 'Passoré', 'Poni', 'Sahel', 'Sanguie', 'Sanmatenga', 'Seno', 'Sissili', 'Soum', 'Sourou', 'Tapoa', 'Tuy', 'Yagha', 'Yatenga', 'Ziro', 'Zondoma', 'Zoundwéogo'];
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});
} else if (country === 'Burundi') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura Rural', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi', 'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi', 'Rutana', 'Ruyigi'];
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});
} else if (country === 'Cabo Verde') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Boa Vista', 'Brava', 'Maio', 'Mosteiros', 'Paul', 'Porto Novo', 'Praia', 'Ribeira Brava', 'Ribeira Grande', 'Ribeira Grande de Santiago', 'Sal', 'Santa Catarina', 'Santa Catarina do Fogo', 'Santa Cruz', 'São Domingos', 'São Filipe', 'São Lourenço dos Órgãos', 'São Miguel', 'São Salvador do Mundo', 'São Vicente', 'Tarrafal', 'Tarrafal de São Nicolau'];
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});
} else if (country === 'Cambodia') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Banteay Meanchey', 'Battambang', 'Kampong Cham', 'Kampong Chhnang', 'Kampong Speu', 'Kampong Thom', 'Kampot', 'Kandal', 'Koh Kong', 'Kratie', 'Mondulkiri', 'Oddar Meanchey', 'Pailin', 'Phnom Penh', 'Preah Sihanouk', 'Preah Vihear', 'Prey Veng', 'Pursat', 'Ratanakiri', 'Siem Reap', 'Stung Treng', 'Svay Rieng', 'Takéo', 'Tbong Khmum'];
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});
} else if (country === 'Cameroon') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Adamaoua', 'Centre', 'East', 'Far North', 'Littoral', 'North', 'Northwest', 'South', 'Southwest', 'West'];
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});
} else if (country === 'Canada') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];
const territories = ['Northwest Territories', 'Nunavut', 'Yukon'];

// Adding provinces
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});

// Adding territories
territories.forEach(territory => {
    const option = document.createElement('option');
    option.value = territory;
    provinceList.appendChild(option);
});
} else if (country === 'Central African Republic') {
provinceInput.disabled = false; // Enable the input
const regions = ['Bangui', 'Bamingui-Bangoran', 'Basse-Kotto', 'Haute-Kotto', 'Haut-Mbomou', 'Kémo', 'Lobaye', 'Mambéré-Kadéï', 'Mbomou', 'Nana-Grébizi', 'Nana-Mambéré', 'Ombella-M Poko', 'Ouaka', 'Ouham', 'Ouham-Pendé', 'Sangha-Mbaéré', 'Vakaga'];
regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    provinceList.appendChild(option);
});
} else if (country === 'Chad') {
provinceInput.disabled = false; // Enable the input
const regions = ['Batha', 'Borkou', 'Chari-Baguirmi', 'Ennedi', 'Guéra', 'Hadjer-Lamis', 'Kanem', 'Lac', 'Logone Occidental', 'Logone Oriental', 'Mandoul', 'Mayo-Kebbi Est', 'Mayo-Kebbi Ouest', 'Moyen-Chari', 'Ouaddaï', 'Salamat', 'Sila', 'Tandjilé', 'Tibesti', 'Wadi Fira'];
regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    provinceList.appendChild(option);
});
} else if (country === 'Chile') {
provinceInput.disabled = false; // Enable the input
const regions = ['Aisén del General Carlos Ibáñez del Campo', 'Antofagasta', 'Araucanía', 'Arica y Parinacota', 'Atacama', 'Bío Bío', 'Coquimbo', 'Libertador General Bernardo O\'Higgins', 'Los Lagos', 'Los Ríos', 'Magallanes y de la Antártica Chilena', 'Maule', 'Región Metropolitana de Santiago', 'Tarapacá', 'Valparaíso'];
regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    provinceList.appendChild(option);
});
} else if (country === 'China') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Anhui', 'Fujian', 'Gansu', 'Guangdong', 'Guizhou', 'Hainan', 'Hebei', 'Heilongjiang', 'Henan', 'Hubei', 'Hunan', 'Jiangsu', 'Jiangxi', 'Jilin', 'Liaoning', 'Qinghai', 'Shaanxi', 'Shandong', 'Shanxi', 'Sichuan', 'Yunnan', 'Zhejiang'];
const autonomousRegions = ['Guangxi Zhuang', 'Inner Mongolia', 'Ningxia Hui', 'Xinjiang Uyghur', 'Tibet'];
const municipalities = ['Beijing', 'Chongqing', 'Shanghai', 'Tianjin'];

// Adding provinces
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});

// Adding autonomous regions
autonomousRegions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    provinceList.appendChild(option);
});

// Adding municipalities
municipalities.forEach(municipality => {
    const option = document.createElement('option');
    option.value = municipality;
    provinceList.appendChild(option);
});
} else if (country === 'Colombia') {
provinceInput.disabled = false; // Enable the input
const departments = ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'];
departments.forEach(department => {
    const option = document.createElement('option');
    option.value = department;
    provinceList.appendChild(option);
});
} else if (country === 'Comoros') {
provinceInput.disabled = false; // Enable the input
const islands = ['Grande Comore (Ngazidja)', 'Anjouan (Nzwani)', 'Mohéli (Mwali)'];
islands.forEach(island => {
    const option = document.createElement('option');
    option.value = island;
    provinceList.appendChild(option);
});
} else if (country === 'Congo (Brazzaville)') {
provinceInput.disabled = false; // Enable the input
const regions = ['Bouenza', 'Brazzaville', 'Cuvette', 'Cuvette-Ouest', 'Kouilou', 'Lékoumou', 'Likouala', 'Niari', 'Plateaux', 'Pointe-Noire', 'Pool', 'Sangha'];
regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    provinceList.appendChild(option);
});
} else if (country === 'Costa Rica') {
provinceInput.disabled = false; // Enable the input
const provinces = ['San Jose', 'Alajuela', 'Cartago', 'Heredia', 'Guanacaste', 'Puntarenas', 'Limon'];
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});
} else if (country === 'Croatia') {
provinceInput.disabled = false; // Enable the input
const counties = ['Bjelovar-Bilogora', 'Brod-Posavina', 'Dubrovnik-Neretva', 'Istria', 'Karlovac', 'Koprivnica-Križevci', 'Krapina-Zagorje', 'Lika-Senj', 'Međimurje', 'Osijek-Baranja', 'Požega-Slavonia', 'Primorje-Gorski Kotar', 'Šibenik-Knin', 'Sisak-Moslavina', 'Split-Dalmatia', 'Varaždin', 'Virovitica-Podravina', 'Vukovar-Srijem', 'Zadar', 'Zagreb (City)', 'Zagreb (County)'];
counties.forEach(county => {
    const option = document.createElement('option');
    option.value = county;
    provinceList.appendChild(option);
});
} else if (country === 'Cuba') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Pinar del Río', 'Artemisa', 'La Habana', 'Mayabeque', 'Matanzas', 'Cienfuegos', 'Villa Clara', 'Sancti Spíritus', 'Ciego de Ávila', 'Camagüey', 'Las Tunas', 'Holguín', 'Granma', 'Santiago de Cuba', 'Guantánamo'];
const specialMunicipality = ['Isla de la Juventud'];

// Adding provinces
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});

// Adding special municipality
specialMunicipality.forEach(municipality => {
    const option = document.createElement('option');
    option.value = municipality;
    provinceList.appendChild(option);
});
} else if (country === 'Cyprus') {
provinceInput.disabled = false; // Enable the input
const districts = ['Famagusta', 'Kyrenia', 'Larnaca', 'Limassol', 'Nicosia', 'Paphos'];
districts.forEach(district => {
    const option = document.createElement('option');
    option.value = district;
    provinceList.appendChild(option);
});
} else if (country === 'Czechia') {
provinceInput.disabled = false; // Enable the input
const regions = ['Prague', 'Central Bohemian', 'South Bohemian', 'Plzeň', 'Karlovy Vary', 'Ústí nad Labem', 'Liberec', 'Hradec Králové', 'Pardubice', 'Vysočina', 'South Moravian', 'Olomouc', 'Zlín', 'Moravian-Silesian'];
regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    provinceList.appendChild(option);
});
} else if (country === 'Denmark') {
provinceInput.disabled = false; // Enable the input
const regions = ['Capital Region of Denmark', 'Central Denmark Region', 'North Denmark Region', 'Region Zealand', 'Region of Southern Denmark'];
regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    provinceList.appendChild(option);
});
} else if (country === 'Djibouti') {
provinceInput.disabled = false; // Enable the input
const regions = ['Ali Sabieh', 'Arta', 'Dikhil', 'Djibouti', 'Obock', 'Tadjourah'];
regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    provinceList.appendChild(option);
});
} else if (country === 'Dominica') {
provinceInput.disabled = false; // Enable the input
const parishes = ['Saint Andrew', 'Saint David', 'Saint George', 'Saint John', 'Saint Joseph', 'Saint Luke', 'Saint Mark', 'Saint Patrick'];
parishes.forEach(parish => {
    const option = document.createElement('option');
    option.value = parish;
    provinceList.appendChild(option);
});
} else if (country === 'Dominican Republic') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Azua', 'Bahoruco', 'Barahona', 'Dajabón', 'Duarte', 'Elías Piña', 'El Seibo', 'Espaillat', 'Hato Mayor', 'Hermanas Mirabal', 'Independencia', 'La Altagracia', 'La Romana', 'La Vega', 'María Trinidad Sánchez', 'Monseñor Nouel', 'Monte Cristi', 'Monte Plata', 'Pedernales', 'Peravia', 'Puerto Plata', 'Samaná', 'San Cristóbal', 'San José de Ocoa', 'San Juan', 'San Pedro de Macorís', 'Sánchez Ramírez', 'Santiago', 'Santiago Rodríguez', 'Santo Domingo', 'Valverde'];
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});
} else if (country === 'East Timor') {
provinceInput.disabled = false; // Enable the input
const municipalities = ['Aileu', 'Ainaro', 'Baucau', 'Bobonaro', 'Cova Lima', 'Dili', 'Ermera', 'Lautem', 'Liquiçá', 'Manatuto', 'Manufahi', 'Oecusse', 'Viqueque'];
municipalities.forEach(municipality => {
    const option = document.createElement('option');
    option.value = municipality;
    provinceList.appendChild(option);
});
} else if (country === 'Ecuador') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Chimborazo', 'Cotopaxi', 'El Oro', 'Esmeraldas', 'Galápagos', 'Guayas', 'Imbabura', 'Loja', 'Los Ríos', 'Manabí', 'Morona-Santiago', 'Napo', 'Orellana', 'Pastaza', 'Pichincha', 'Santa Elena', 'Santo Domingo de los Tsáchilas', 'Sucumbíos', 'Tungurahua', 'Zamora-Chinchipe'];
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});
} else if (country === 'Egypt') {
provinceInput.disabled = false; // Enable the input
const governorates = ['Alexandria', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Cairo', 'Dakahlia', 'Damietta', 'Faiyum', 'Gharbia', 'Giza', 'Ismailia', 'Kafr El Sheikh', 'Luxor', 'Matrouh', 'Minya', 'Monufia', 'New Valley', 'North Sinai', 'Port Said', 'Qalyubia', 'Qena', 'Red Sea', 'Sharqia', 'Sohag', 'South Sinai', 'Suez'];
governorates.forEach(governorate => {
    const option = document.createElement('option');
    option.value = governorate;
    provinceList.appendChild(option);
});
} else if (country === 'El Salvador') {
provinceInput.disabled = false; // Enable the input
const departments = ['Ahuachapán', 'Cabañas', 'Chalatenango', 'Cuscatlán', 'La Libertad', 'La Paz', 'La Unión', 'Morazán', 'San Miguel', 'San Salvador', 'San Vicente', 'Santa Ana', 'Sonsonate', 'Usulután'];
departments.forEach(department => {
    const option = document.createElement('option');
    option.value = department;
    provinceList.appendChild(option);
});
} else if (country === 'Equatorial Guinea') {
provinceInput.disabled = false; // Enable the input
const provinces = ['Annobón', 'Bioko Norte', 'Bioko Sur', 'Centro Sur', 'Kié-Ntem', 'Litoral', 'Wele-Nzas'];
provinces.forEach(province => {
    const option = document.createElement('option');
    option.value = province;
    provinceList.appendChild(option);
});
} else if (country === 'Eritrea') {
provinceInput.disabled = false; // Enable the input
const regions = ['Anseba', 'Debub', 'Gash-Barka', 'Maekel', 'Northern Red Sea', 'Southern Red Sea'];
regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    provinceList.appendChild(option);
});
} else if (country === 'Estonia') {
provinceInput.disabled = false; // Enable the input
const counties = ['Harju County', 'Hiiu County', 'Ida-Viru County', 'Järva County', 'Jõgeva County', 'Lääne County', 'Lääne-Viru County', 'Pärnu County', 'Põlva County', 'Rapla County', 'Saare County', 'Tartu County', 'Valga County', 'Viljandi County', 'Võru County'];
counties.forEach(county => {
    const option = document.createElement('option');
    option.value = county;
    provinceList.appendChild(option);
});
} else if (country === 'Eswatini') {
provinceInput.disabled = false; // Enable the input
const regions = ['Hhohho', 'Lubombo', 'Manzini', 'Shiselweni'];
regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    provinceList.appendChild(option);
});
} else if (country === 'Ethiopia') {
provinceInput.disabled = false; // Enable the input
const regions = ['Addis Ababa', 'Afar', 'Amhara', 'Benishangul-Gumuz', 'Dire Dawa', 'Gambela', 'Harari', 'Oromia', 'Sidama', 'Somali', 'Southern Nations, Nationalities, and Peoples\' Region (SNNPR)', 'Tigray'];
regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    provinceList.appendChild(option);
});
} else {
  provinceInput.disabled = true; // Disable the input if no country is selected
}
}

document.getElementById('countryRegion').addEventListener('input', function() {
  validateCountryInput(); // Keep your existing validation
  updateProvinces(this.value); // Update the provinces based on the selected country
});

document.getElementById('doubleCheckButton').addEventListener('click', function() {
  hideModal();
});

document.getElementById('submitButton').addEventListener('click', function() {
  showPreloader();
  submitToTheServer();
  showSuccessMessage();
});

function showPreloader() {
  document.querySelector('.preloader').classList.remove('hidden');
}

function showSuccessMessage() {
  setTimeout(() => {
    document.querySelector('.preloader').classList.add('hidden');
    showModal();
    document.getElementById('successModal').style.display = 'block';
  }, 2000);
}

document.getElementById('okButton').addEventListener('click', function() {
  hideSuccessModal();
});

function showModal() {
  document.getElementById('confirmationModal').style.display = 'block';
}

function hideModal() {
  document.getElementById('confirmationModal').style.display = 'none';
}

function hideSuccessModal() {
  document.getElementById('successModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide-page');
  slides.forEach((slide, index) => {
    const inputs = slide.querySelectorAll('input, select, textarea');
    if (inputs.length > 0) {
      const lastInput = inputs[inputs.length - 1];
      lastInput.addEventListener('keydown', function(event) {
        if (event.key === 'Tab' && !event.shiftKey) {
          if (index < slides.length - 1) {
            event.preventDefault();
            goToSlide(index + 1);
          }
        }
      });
    }
  });
});

document.getElementById('okButton').addEventListener('click', function() {
  hideSuccessModal();
  window.location.href = '/home';
});

function saveFormData(formId) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  if (formId === 'formPersonalInfo') {
    formObject.sex = document.getElementById('sex').value;
    formObject.race = document.getElementById('race').value;
    formObject.phoneNumber = document.getElementById('phoneNumber').value;
    formObject.province = document.getElementById('province').value;
  } else if (formId === 'formAccomplishmentsTwo') {
    formObject.Edu = document.getElementById('Edu').value;
  }
  localStorage.setItem(formId, JSON.stringify(formObject));
}

function loadFormData(formId) {
  const savedData = localStorage.getItem(formId);
  if (savedData) {
    const formObject = JSON.parse(savedData);
    const form = document.getElementById(formId);
    Object.keys(formObject).forEach(key => {
      const input = form.querySelector(`[name=${key}]`);
      if (input) {
        if (input.type === "file") {
          input.value = ""; // Clear the file input value
        } else {
          input.value = formObject[key];
        }
      }
    });
    if (formId === 'formPersonalInfo') {
      document.getElementById('sex').value = formObject.sex || '';
      document.getElementById('race').value = formObject.race || '';
      document.getElementById('phoneNumber').value = formObject.phoneNumber || '';
      document.getElementById('province').value = formObject.province || '';
    } else if (formId === 'formAccomplishmentsTwo') {
      document.getElementById('Edu').value = formObject.Edu || '';
    }
  }
}
function enablePhoneNumberInput() {
  var countryCode = document.getElementById("phoneCountryCode").value;
  var phoneNumberInput = document.getElementById("phoneNumber");
  if (countryCode) {
    phoneNumberInput.disabled = false;
  } else {
    phoneNumberInput.disabled = true;
  }
}

function enableEmergencyNumberInput() {
  var countryCode = document.getElementById("emergencyPhoneCountryCode").value;
  var phoneNumberInput = document.getElementById("emergencyPhoneNumber");
  if (countryCode) {
    phoneNumberInput.disabled = false;
  } else {
    phoneNumberInput.disabled = true;
  }
}

function savePDFToLocalStorage() {
  const englishProficiencyInput = document.getElementById('englishProficiencyInput');
  const schoolReportInput = document.getElementById('schoolReport');

  const formAccomplishmentsOne = JSON.parse(localStorage.getItem('formAccomplishmentsOne')) || {};
  const formAccomplishmentsTwo = JSON.parse(localStorage.getItem('formAccomplishmentsTwo')) || {};

  // Save englishProficiency PDF in formAccomplishmentsOne
  const englishProficiencyFile = englishProficiencyInput.files[0];
  if (englishProficiencyFile && englishProficiencyFile.type === 'application/pdf') {
    const reader = new FileReader();
    reader.onload = function (e) {
      formAccomplishmentsOne.englishProficiencyPDF = e.target.result;
      localStorage.setItem('formAccomplishmentsOne', JSON.stringify(formAccomplishmentsOne));
    };
    reader.readAsDataURL(englishProficiencyFile);
  } else if (englishProficiencyFile) {
    alert('Please upload a valid PDF file for English Proficiency.');
  }

  // Save schoolReport PDF in formAccomplishmentsTwo
  const schoolReportFile = schoolReportInput.files[0];
  if (schoolReportFile && schoolReportFile.type === 'application/pdf') {
    const reader = new FileReader();
    reader.onload = function (e) {
      formAccomplishmentsTwo.schoolReportPDF = e.target.result;
      localStorage.setItem('formAccomplishmentsTwo', JSON.stringify(formAccomplishmentsTwo));
    };
    reader.readAsDataURL(schoolReportFile);
  } else if (schoolReportFile) {
    alert('Please upload a valid PDF file for School Report.');
  }

  // Remove unnecessary fields from localStorage
  if (formAccomplishmentsOne.englishproficiency) {
    delete formAccomplishmentsOne.englishproficiency;
    localStorage.setItem('formAccomplishmentsOne', JSON.stringify(formAccomplishmentsOne));
  }

  if (formAccomplishmentsTwo.schoolreport) {
    delete formAccomplishmentsTwo.schoolreport;
    localStorage.setItem('formAccomplishmentsTwo', JSON.stringify(formAccomplishmentsTwo));
  }
}

function getUniversityURL() {
  // Get the current URL
  const currentURL = window.location.href;

  // Use a regular expression to match the /form/university_url pattern
  const urlPattern = /\/form\/([a-zA-Z0-9-_]+)/;

  // Execute the regex on the current URL
  const match = currentURL.match(urlPattern);

  // If a match is found, return the university URL
  if (match && match[1]) {
    return match[1];
  } else {
    // If no match is found, return null or an empty string
    return null;
  }
}

async function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

async function submitToTheServer() {
  const formPersonalInfo = document.getElementById('formPersonalInfo');
  const formAccomplishmentsOne = document.getElementById('formAccomplishmentsOne');
  const formAccomplishmentsTwo = document.getElementById('formAccomplishmentsTwo');
  const formFinalization = document.getElementById('formFinalization');

  const formData = {};

  // Add data from formPersonalInfo
  formData.firstName = formPersonalInfo.querySelector('#firstName').value;
  formData.lastName = formPersonalInfo.querySelector('#lastName').value;
  formData.email = formPersonalInfo.querySelector('#email').value;
  formData.phoneCountryCode = formPersonalInfo.querySelector('#phoneCountryCode').value;
  formData.phoneNumber = formPersonalInfo.querySelector('#phoneNumber').value;
  formData.sex = formPersonalInfo.querySelector('#sex').value;
  formData.birthday = formPersonalInfo.querySelector('#birthday').value;
  formData.race = formPersonalInfo.querySelector('#race').value;
  formData.countryRegion = formPersonalInfo.querySelector('#countryRegion').value;
  formData.province = formPersonalInfo.querySelector('#province').value;
  formData.city = formPersonalInfo.querySelector('#city').value;
  formData.address = formPersonalInfo.querySelector('#address').value;
  formData.zipCode = formPersonalInfo.querySelector('#zipCode').value;

  try {
    // Add data from formAccomplishmentsOne
    const englishProficiencyFile = formAccomplishmentsOne.querySelector('#englishProficiencyInput').files[0];
    if (englishProficiencyFile && englishProficiencyFile.type === 'application/pdf') {
      formData.englishProficiency = await readFileAsDataURL(englishProficiencyFile);
      console.log('English:', formData.englishProficiency);
    } else if (!englishProficiencyFile) {
      alert('Please upload a valid PDF file for English Proficiency.');
      return;
    }

    // Add data from formAccomplishmentsTwo
    formData.schoolName = formAccomplishmentsTwo.querySelector('#schoolName').value;
    formData.schoolAddress = formAccomplishmentsTwo.querySelector('#address').value;
    formData.education = formAccomplishmentsTwo.querySelector('#Edu').value;
    const schoolReportFile = formAccomplishmentsTwo.querySelector('#schoolReport').files[0];
    if (schoolReportFile && schoolReportFile.type === 'application/pdf') {
      formData.schoolReport = await readFileAsDataURL(schoolReportFile);
      console.log('School:', formData.schoolReport);
    } else if (!schoolReportFile) {
      alert('Please upload a valid PDF file for School Report.');
      return;
    }

    formData.schoolCity = formAccomplishmentsTwo.querySelector('#city').value;
    formData.schoolProvince = formAccomplishmentsTwo.querySelector('#provence').value;
    formData.schoolZipCode = formAccomplishmentsTwo.querySelector('#zipCode').value;

    // Add data from formFinalization
    formData.fatherName = formFinalization.querySelector('#fatherName').value;
    formData.motherName = formFinalization.querySelector('#motherName').value;
    formData.emergencyEmail = formFinalization.querySelector('#emergencyEmail').value;
    formData.emergencyPhoneCountryCode = formFinalization.querySelector('#emergencyPhoneCountryCode').value;
    formData.emergencyPhoneNumber = formFinalization.querySelector('#emergencyPhoneNumber').value;

    const body = JSON.stringify(formData);

    const universityUrl = getUniversityURL();

    const response = await fetch(`/api/apply/${universityUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    });

    if (response.ok) {
      document.getElementById('successModal').style.display = 'block';
    } else {
      console.error('Error submitting the form');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}