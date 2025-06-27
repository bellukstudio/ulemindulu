<?php

namespace App\Livewire\Admin;

use App\Application\Auth\LoginUseCase;
use App\Models\User\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Livewire\Attributes\Validate;
use Livewire\Component;
class Login extends Component
{

    #[Validate('required|email')]
    public $email;

    #[Validate('required|min:6')]
    public $password;

    private LoginUseCase $loginUseCase;

    public function boot(LoginUseCase $loginUseCase)
    {
        $this->loginUseCase = $loginUseCase;
        $this->email = env('EMAIL_ADMIN') ?? "";
        $this->password = env('PASSWORD_ADMIN') ?? "";

        if (Auth::check()) {
            redirect()->route('dashboard');
        }
    }

    public function login()
    {
        $this->validate();

        $salt = env('PASSWORD_SALT');
        $user = User::where('email', $this->email)->where('role', 'superadmin')->first();
        $saltedPassword = $this->password . $salt;


        $creadentials = [
            'email' => $this->email,
            'password' => $saltedPassword
        ];

        if (!Hash::check($saltedPassword, $user->password, [])) {
            $this->addError('password', 'The password are incorrect.');
        }

        try {
            $this->loginUseCase->execute($creadentials);
            return redirect()->route('dashboard');
        } catch (\Exception $e) {
            $this->addError('email', 'The provided credentials are incorrect. ' . $e);
        }
    }


    public function layout()
    {
        return 'components.layouts.guest';
    }


    public function render()
    {

        return view('livewire.admin.login')->layout('components.layouts.guest');
    }
}
