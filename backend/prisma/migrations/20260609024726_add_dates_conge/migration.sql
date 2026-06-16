/*
  Warnings:

  - The primary key for the `demandes_conge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_demande_conge` on the `demandes_conge` table. All the data in the column will be lost.
  - You are about to alter the column `statut_demandes_conge` on the `demandes_conge` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.

*/
-- DropForeignKey
ALTER TABLE "demandes_conge" DROP CONSTRAINT "demandes_conge_id_employe_fkey";

-- DropForeignKey
ALTER TABLE "demandes_conge" DROP CONSTRAINT "demandes_conge_id_type_conge_fkey";

-- AlterTable
ALTER TABLE "demandes_conge" DROP CONSTRAINT "demandes_conge_pkey",
DROP COLUMN "id_demande_conge",
ADD COLUMN     "id_demande_conde" SERIAL NOT NULL,
ALTER COLUMN "date_debut" DROP NOT NULL,
ALTER COLUMN "date_debut" SET DATA TYPE DATE,
ALTER COLUMN "date_fin" DROP NOT NULL,
ALTER COLUMN "date_fin" SET DATA TYPE DATE,
ALTER COLUMN "nombre_jours" DROP NOT NULL,
ALTER COLUMN "statut_demandes_conge" DROP NOT NULL,
ALTER COLUMN "statut_demandes_conge" DROP DEFAULT,
ALTER COLUMN "statut_demandes_conge" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "date_demande" DROP NOT NULL,
ALTER COLUMN "date_demande" SET DATA TYPE TIMESTAMP(6),
ADD CONSTRAINT "demandes_conge_pkey" PRIMARY KEY ("id_demande_conde");

-- AddForeignKey
ALTER TABLE "demandes_conge" ADD CONSTRAINT "demandes_conge_id_employe_fkey" FOREIGN KEY ("id_employe") REFERENCES "employe"("id_employe") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "demandes_conge" ADD CONSTRAINT "demandes_conge_id_type_conge_fkey" FOREIGN KEY ("id_type_conge") REFERENCES "types_conge"("id_conge") ON DELETE NO ACTION ON UPDATE NO ACTION;
