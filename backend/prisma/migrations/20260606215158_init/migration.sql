/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "utilisateur" (
    "id_utilisateur" SERIAL NOT NULL,
    "nom_utilisateur" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "mdp" TEXT NOT NULL,
    "mail" TEXT NOT NULL,

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id_utilisateur")
);

-- CreateTable
CREATE TABLE "rh" (
    "id_rh" SERIAL NOT NULL,
    "nom_rh" TEXT NOT NULL,
    "prenom_rh" TEXT NOT NULL,
    "telephone_rh" TEXT,
    "adresse_rh" TEXT,
    "statut_rh" TEXT NOT NULL DEFAULT 'actif',
    "id_utilisateur" INTEGER NOT NULL,

    CONSTRAINT "rh_pkey" PRIMARY KEY ("id_rh")
);

-- CreateTable
CREATE TABLE "departement" (
    "id_departement" SERIAL NOT NULL,
    "nom_departement" TEXT NOT NULL,
    "id_manager" INTEGER,

    CONSTRAINT "departement_pkey" PRIMARY KEY ("id_departement")
);

-- CreateTable
CREATE TABLE "manager" (
    "id_manager" SERIAL NOT NULL,
    "nom_manager" TEXT NOT NULL,
    "prenom_manager" TEXT NOT NULL,
    "telephone_manager" TEXT,
    "adresse_manager" TEXT,
    "statut_manager" TEXT NOT NULL DEFAULT 'actif',
    "id_departement" INTEGER,
    "id_utilisateur" INTEGER NOT NULL,

    CONSTRAINT "manager_pkey" PRIMARY KEY ("id_manager")
);

-- CreateTable
CREATE TABLE "employe" (
    "id_employe" SERIAL NOT NULL,
    "nom_employe" TEXT NOT NULL,
    "prenom_employe" TEXT NOT NULL,
    "telephone_employe" TEXT,
    "adresse_employe" TEXT,
    "statut_employe" TEXT NOT NULL DEFAULT 'actif',
    "jours_acquis_annuel" INTEGER NOT NULL DEFAULT 30,
    "id_departement" INTEGER,
    "id_utilisateur" INTEGER NOT NULL,

    CONSTRAINT "employe_pkey" PRIMARY KEY ("id_employe")
);

-- CreateTable
CREATE TABLE "types_conge" (
    "id_conge" SERIAL NOT NULL,
    "nom_types_conge" TEXT NOT NULL,
    "statut_types_conge" TEXT NOT NULL DEFAULT 'actif',
    "duree" INTEGER,
    "id_manager" INTEGER,

    CONSTRAINT "types_conge_pkey" PRIMARY KEY ("id_conge")
);

-- CreateTable
CREATE TABLE "demandes_conge" (
    "id_demande_conge" SERIAL NOT NULL,
    "id_employe" INTEGER NOT NULL,
    "id_type_conge" INTEGER NOT NULL,
    "date_debut" TIMESTAMP(3) NOT NULL,
    "date_fin" TIMESTAMP(3) NOT NULL,
    "nombre_jours" INTEGER NOT NULL,
    "motif" TEXT,
    "statut_demandes_conge" TEXT NOT NULL DEFAULT 'en_attente',
    "commentaire_manager" TEXT,
    "commentaire_rh" TEXT,
    "date_demande" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "demandes_conge_pkey" PRIMARY KEY ("id_demande_conge")
);

-- CreateTable
CREATE TABLE "demandes_permission" (
    "id_demande_permission" SERIAL NOT NULL,
    "id_employe" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "heure_debut" TEXT NOT NULL,
    "heure_fin" TEXT NOT NULL,
    "duree_minutes" INTEGER,
    "motif" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'en_attente',
    "commentaire_manager" TEXT,
    "date_demande" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "demandes_permission_pkey" PRIMARY KEY ("id_demande_permission")
);

-- CreateTable
CREATE TABLE "notification" (
    "id_notification" SERIAL NOT NULL,
    "id_utilisateur" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "statut_notification" TEXT NOT NULL DEFAULT 'non_lu',
    "date_envoie_notification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id_notification")
);

-- CreateTable
CREATE TABLE "jours_feries" (
    "id_jours_feries" SERIAL NOT NULL,
    "nom_jours_feries" TEXT NOT NULL,
    "date_jours_feries" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jours_feries_pkey" PRIMARY KEY ("id_jours_feries")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_mail_key" ON "utilisateur"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "rh_id_utilisateur_key" ON "rh"("id_utilisateur");

-- CreateIndex
CREATE UNIQUE INDEX "manager_id_utilisateur_key" ON "manager"("id_utilisateur");

-- CreateIndex
CREATE UNIQUE INDEX "employe_id_utilisateur_key" ON "employe"("id_utilisateur");

-- CreateIndex
CREATE UNIQUE INDEX "jours_feries_date_jours_feries_key" ON "jours_feries"("date_jours_feries");

-- AddForeignKey
ALTER TABLE "rh" ADD CONSTRAINT "rh_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manager" ADD CONSTRAINT "manager_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manager" ADD CONSTRAINT "manager_id_departement_fkey" FOREIGN KEY ("id_departement") REFERENCES "departement"("id_departement") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employe" ADD CONSTRAINT "employe_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employe" ADD CONSTRAINT "employe_id_departement_fkey" FOREIGN KEY ("id_departement") REFERENCES "departement"("id_departement") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "types_conge" ADD CONSTRAINT "types_conge_id_manager_fkey" FOREIGN KEY ("id_manager") REFERENCES "manager"("id_manager") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demandes_conge" ADD CONSTRAINT "demandes_conge_id_employe_fkey" FOREIGN KEY ("id_employe") REFERENCES "employe"("id_employe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demandes_conge" ADD CONSTRAINT "demandes_conge_id_type_conge_fkey" FOREIGN KEY ("id_type_conge") REFERENCES "types_conge"("id_conge") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demandes_permission" ADD CONSTRAINT "demandes_permission_id_employe_fkey" FOREIGN KEY ("id_employe") REFERENCES "employe"("id_employe") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_id_utilisateur_fkey" FOREIGN KEY ("id_utilisateur") REFERENCES "utilisateur"("id_utilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;
