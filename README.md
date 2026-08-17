# Les Gardiens d’une Promesse

Site d’invitation pour le mariage de Sandrine et Alain. Il présente leur histoire, le programme de la journée, le lieu, le dress code, une galerie, un formulaire de confirmation de présence (RSVP) et un livre d’or.

## Technologies

- Next.js 16, React 19 et TypeScript
- Tailwind CSS
- MongoDB avec Mongoose
- QR code généré pour chaque RSVP

## Lancer le projet localement

Prérequis : Node.js 20.9 ou une version ultérieure, ainsi qu’une base de données MongoDB.

1. Installez les dépendances :

   ```bash
   npm install
   ```

2. Créez un fichier `.env.local` à la racine du projet :

   ```env
   MONGODB_URI="mongodb+srv://utilisateur:mot-de-passe@cluster.mongodb.net/wedding-app?retryWrites=true&w=majority"
   ```

   Remplacez la valeur par votre propre chaîne de connexion MongoDB. Ce fichier est ignoré par Git et ne doit pas être publié.

3. Démarrez le serveur de développement :

   ```bash
   npm run dev
   ```

   Ouvrez ensuite [http://localhost:3000](http://localhost:3000).

## Vérifier la version de production

Avant de publier, vérifiez que le projet se construit correctement :

```bash
npm run lint
npm run build
```

## Publier sur GitHub

Après avoir créé un dépôt vide sur GitHub, exécutez ces commandes dans ce dossier en remplaçant l’URL par celle de votre dépôt :

```bash
git init
git add .
git commit -m "Première version du site de mariage"
git branch -M main
git remote add origin https://github.com/votre-compte/wedding-sandrine-alain.git
git push -u origin main
```

Ne publiez jamais votre fichier `.env.local` ni votre chaîne de connexion MongoDB.

## Déployer avec Vercel

1. Connectez-vous à [Vercel](https://vercel.com) avec votre compte GitHub.
2. Cliquez sur **Add New → Project**, puis importez le dépôt `wedding-sandrine-alain`.
3. Laissez les paramètres de build détectés par défaut pour Next.js.
4. Dans **Environment Variables**, ajoutez `MONGODB_URI` avec la même valeur que dans `.env.local`.
5. Cliquez sur **Deploy**.

Chaque nouveau `git push` sur la branche `main` déclenchera automatiquement un nouveau déploiement sur Vercel.
