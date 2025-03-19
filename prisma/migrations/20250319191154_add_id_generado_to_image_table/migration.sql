/*
  Warnings:

  - Added the required column `id_generado` to the `imagenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imagenes" ADD COLUMN     "id_generado" TEXT NOT NULL;
