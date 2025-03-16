/*
  Warnings:

  - Added the required column `usuarioId` to the `bitacora_usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bitacora_usuarios" ADD COLUMN     "usuarioId" INTEGER NOT NULL;
