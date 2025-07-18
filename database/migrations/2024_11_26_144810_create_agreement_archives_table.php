<?php

use App\Models\Mitra;
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
        Schema::create('agreement_archives', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Mitra::class)->constrained()->cascadeOnDelete();
            $table->string('nama_instansi');
            $table->text('nama_kegiatan');
            $table->text('deskripsi_kegiatan');
            $table->string('no_ia');
            $table->date('waktu_kerjasama_mulai');
            $table->date('waktu_kerjasama_selesai');
            $table->string('durasi_kerjasama');
            $table->string('tahun_ajaran');
            $table->string('tahun_ajaran_1');
            $table->string('tahun_ajaran_2');
            $table->string('jenis_kegiatan');
            $table->string('pihak_1');
            $table->string('pihak_2');
            $table->string('jabatan_pihak_1');
            $table->string('jabatan_pihak_2');
            $table->string('bentuk_kegiatan');
            $table->string('ringkasan_luaran');
            // $table->string('kriteria_mitra');
            // $table->string('asal_mitra');
            // $table->string('ruang_lingkup_kerjasama');
            $table->string('draft')->nullable();
            $table->string('dokumen_kerjasama')->nullable();
            $table->string('dokumen_ia_bertandatangan')->nullable();
            $table->string('dokumen_laporan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agreement_archives');
    }
};