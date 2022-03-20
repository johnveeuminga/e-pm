<?php
namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;

class UserImport implements ToCollection {
    /**
     * @param  Collection  $collection
     */
    public function collection(Collection $rows)
    {
        foreach($rows as $row) {
            $last_name = explode(", ", $row[2])[0];
            $email = $row[1];
            $password = strtolower($last_name) . "-" . strtolower($email);

            User::create([
                'name' => $last_name,
                'email' => $row[1],
                'section' => $row[3],
                'branch' => $row[4],
                'password' => Hash::make($password),
                'email_verified_at' => now(),
            ]);
        }
    }
}