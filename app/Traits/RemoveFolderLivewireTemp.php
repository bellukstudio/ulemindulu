<?php

namespace App\Traits;

trait RemoveFolderLivewireTemp
{
    protected function removeFileFromFolderTmp()
    {
        $tempDir = storage_path('app/livewire-tmp');

        if (is_dir($tempDir)) {
            $files = glob($tempDir . '/*');

            foreach ($files as $file) {
                if (is_file($file)) {
                    unlink($file);
                }
            }
        }
    }
}
