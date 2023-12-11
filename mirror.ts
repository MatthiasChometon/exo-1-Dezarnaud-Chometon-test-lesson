// Fonction pour déterminer le moment de la journée
export function getMomentOfDay (): string {
 const currentHour = new Date().getHours();
 if (currentHour >= 5 && currentHour < 12) {
  return 'Bonjour';
 } else if (currentHour >= 12 && currentHour < 18) {
  return 'Bon après-midi';
 } else {
  return 'Bonsoir';
 }
}

// Fonction pour inverser une chaîne de caractères
export function reverseString (str: string): string {
 return str.split('').reverse().join('');
}

// Fonction principale
export function mirror (userInput: string) {
 // Salutation au démarrage
 const greeting = getMomentOfDay();
 console.log(`${greeting}! Bienvenue dans l'application miroir et palindrome.`);

 console.log({ userInput })

 // Vérifier si l'utilisateur souhaite quitter
 if (userInput === null || userInput.toLowerCase() === 'exit') {
  return
 }

 // Vérifier si la saisie est un palindrome
 const reversedInput = reverseString(userInput);
 const isPalindrome = userInput.toLowerCase() === reversedInput.toLowerCase();

 // Afficher la réponse appropriée
 if (isPalindrome) {
  console.log('Bien dit !');
 } else {
  console.log(`En miroir : ${reverseString(userInput)}`);
 }

 // Salutation à l'arrêt
 const farewell = getMomentOfDay() === 'Bonsoir' ? 'Bonne nuit' : 'Au revoir';
 console.log(`${farewell}!`);
}
