<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Test User',
            'jabatan' => 'Tester',
            'nip' => '123',
            'password' => bcrypt('123'),
            'is_admin' => true,
        ]);

        User::create([
            'name' => 'Admin User',
            'jabatan' => 'User',
            'nip' => '456',
            'password' => bcrypt('456'),
            'is_admin' => false,
        ]);
    }
}
