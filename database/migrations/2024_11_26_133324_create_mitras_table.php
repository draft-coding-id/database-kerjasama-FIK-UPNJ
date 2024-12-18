<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mitras', function (Blueprint $table) {
            $table->id();
            $table->string('nama_instansi');
            $table->text('deskripsi_instansi');
            $table->string('no_pks_pihak_1');
            $table->string('no_pks_pihak_2');
            $table->string('pihak_1');
            $table->string('pihak_2');
            $table->string('kriteria_mitra');
            $table->string('asal_mitra');
            $table->string('ruang_lingkup_kerjasama');
            $table->date('waktu_kerjasama_mulai');
            $table->date('waktu_kerjasama_selesai');
            $table->string('dokumen_pks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mitras');
    }
};
