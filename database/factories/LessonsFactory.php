<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lessons>
 */
class LessonsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        static $parent_id = 0;

        return [
            //
            'name' => $this->faker->words(2, true),
            'description' => $this->faker->paragraph(5),
            'module_id' => 1,
            'parent_id' => $parent_id++,
            'media_url' => $this->faker->imageUrl(640, 480, 'animals')
        ];
    }
}
