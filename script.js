// Initialisation du panier
let panier = [];

// Fonction pour afficher le panier
function afficherPanier() {
    document.getElementById('panier-section').style.display = 'block';
    document.getElementById('resume-section').style.display = 'none';
    document.getElementById('notification').style.display = 'none';

    // Calculer le total du panier
    let total = 0;
    let panierHTML = '';
    const cartCount = document.getElementById('cart-count');

    panier.forEach((article, index) => {
        const { nom, prix, supplements, quantite } = article;
        const prixTotal = (prix + supplémentsPrix(supplements)) * quantite;

        panierHTML += `
            <div>
                <span>${nom} - ${prixTotal.toFixed(2)}€ x ${quantite}</span>
                <button onclick="supprimerArticle(${index})">Supprimer</button>
                <button onclick="supprimerToutArticle(${index})">Supprimer Tout</button>
            </div>
        `;
        total += prixTotal;
    });

    document.getElementById('panier').innerHTML = panierHTML;
    document.getElementById('total').innerText = total.toFixed(2);
    cartCount.innerText = panier.length;
}

// Fonction pour choisir les options de pizza
function choisirOptions(nom, prix) {
    const modal = document.getElementById('supplement-modal');
    document.getElementById('pizza-name').innerText = nom;
    document.getElementById('supplement-prix').value = prix;
    document.getElementById('quantite').value = 1; // Reset de la quantité
    modal.style.display = 'block';
}

// Fonction pour fermer le modal
function fermerModal() {
    document.getElementById('supplement-modal').style.display = 'none';
}

// Fonction pour ajouter un dessert au panier
function ajouterDessert(nom, prix) {
    const article = {
        nom: nom,
        prix: prix,
        supplements: [], // Pas de suppléments pour les desserts
        quantite: 1,
    };

    // Vérifier si le dessert est déjà dans le panier
    const articleExistant = panier.find(item => item.nom === nom);
    if (articleExistant) {
        articleExistant.quantite += 1; // Augmenter la quantité si déjà présent
    } else {
        panier.push(article); // Ajouter le nouvel article
    }

    afficherPanier();
    afficherNotification(`${nom} a été ajouté au panier !`);
}

// Fonction pour ajouter des suppléments à une pizza
function ajouterSupplement() {
    const nom = document.getElementById('pizza-name').innerText;
    const prixDeBase = parseFloat(document.getElementById('supplement-prix').value);
    const quantite = parseInt(document.getElementById('quantite').value);
    
    const supplements = [];
    if (document.getElementById('champignons').checked) {
        supplements.push('Champignons (+1€)');
    }
    if (document.getElementById('pepperoni').checked) {
        supplements.push('Pepperoni (+1.50€)');
    }
    if (document.getElementById('olives').checked) {
        supplements.push('Olives (+0.50€)');
    }

    const article = {
        nom: nom,
        prix: prixDeBase,
        supplements: supplements,
        quantite: quantite,
    };

    // Vérifier si la pizza existe déjà dans le panier
    const articleExistant = panier.find(item => item.nom === nom);
    if (articleExistant) {
        articleExistant.quantite += quantite; // Ajouter à la quantité
        articleExistant.supplements = [...articleExistant.supplements, ...supplements]; // Ajouter les suppléments
    } else {
        panier.push(article); // Ajouter la pizza si elle n'est pas encore dans le panier
    }

    fermerModal();
    afficherPanier();
    afficherNotification(`${nom} avec suppléments a été ajouté au panier !`);
}

// Fonction pour calculer le prix des suppléments
function supplémentsPrix(supplements) {
    let totalSuppléments = 0;
    if (supplements.includes('Champignons (+1€)')) {
        totalSuppléments += 1;
    }
    if (supplements.includes('Pepperoni (+1.50€)')) {
        totalSuppléments += 1.50;
    }
    if (supplements.includes('Olives (+0.50€)')) {
        totalSuppléments += 0.50;
    }
    return totalSuppléments;
}

// Fonction pour afficher une notification
function afficherNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // La notification disparaît après 3 secondes
}

// Fonction pour supprimer une unité d'un article du panier
function supprimerArticle(index) {
    if (panier[index].quantite > 1) {
        panier[index].quantite -= 1; // Réduire la quantité
    } else {
        panier.splice(index, 1); // Supprimer l'article si la quantité est 1
    }
    afficherPanier();
}

// Fonction pour supprimer tous les articles d'un même type
function supprimerToutArticle(index) {
    const nom = panier[index].nom;
    panier = panier.filter(article => article.nom !== nom); // Supprimer tous les articles du même type
    afficherPanier();
}

// Fonction pour vider le panier
function viderPanier() {
    panier = [];
    afficherPanier();
}

// Fonction pour finaliser la commande
function finaliserCommande() {
    document.getElementById('panier-section').style.display = 'none';
    document.getElementById('resume-section').style.display = 'block';
    document.getElementById('resume-panier').innerHTML = panier.map(article => {
        const { nom, prix, supplements, quantite } = article;
        return `<div>${nom} - ${(prix + supplémentsPrix(supplements)).toFixed(2)}€ x ${quantite}</div>`;
    }).join('');

    const total = panier.reduce((acc, article) => acc + (article.prix + supplémentsPrix(article.supplements)) * article.quantite, 0);
    document.getElementById('resume-total').innerText = total.toFixed(2);
}

// Fonction pour gérer le paiement
function payer() {
    alert("Merci pour votre commande !");
    viderPanier(); // Vider le panier après paiement
}



















