<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class ContactusController extends Controller
{
    public function index() {
        return inertia('FrontendContactusPage');
    }
}
