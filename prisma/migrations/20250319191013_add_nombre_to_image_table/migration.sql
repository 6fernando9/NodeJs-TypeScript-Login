/*
  Warnings:

  - Added the required column `nombre` to the `imagenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imagenes" ADD COLUMN     "nombre" TEXT NOT NULL;
