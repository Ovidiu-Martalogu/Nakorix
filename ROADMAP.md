# Nakorix Roadmap

## Sprint 1
- [x] React + Vite
- [x] Layout
- [x] Sidebar
- [x] Header

## Sprint 2
- [x] Dashboard
- [x] Charts
- [x] DeviceTable
- [x] Search
- [x] Add Device Modal

## Sprint 3
- [ ] Save Device
- [ ] Edit Device
- [ ] Delete Device
- [ ] Confirm Delete
- [ ] Validation

1. Laravel

Ai creat backend-ul:

server/

cu Laravel 12.66.0.

Laravel este aplicația care va sta între React și baza de date.

2. Conexiunea cu MySQL

În .env ai:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nakorix
DB_USERNAME=root
DB_PASSWORD=

Asta nu este cod Laravel propriu-zis.

Este configurația pe care Laravel o citește.

Practic:

DB_HOST
   ↓
unde este MySQL?

127.0.0.1
   ↓
pe calculatorul meu
DB_PORT
   ↓
prin ce port?

3306
DB_DATABASE
   ↓
ce bază?

nakorix
3. Migration

Am creat:

database/migrations/
2026_08_11_161918_create_devices_table.php

Și ai scris:

Schema::create('devices', function (Blueprint $table) {

Asta înseamnă:

Laravel, creează o tabelă numită devices.

Apoi:

$table->id();

Laravel creează:

id

ca primary key, auto-increment.

De aceea în Adminer ai văzut:

id | bigint unsigned | Auto Increment

Apoi:

$table->string('name');

înseamnă:

name → varchar(191)

și la fel:

$table->string('ip');
$table->string('mac');
$table->string('type');
$table->string('status');

Ai ales corect să nu tratezi IP-ul ca număr.

Apoi ai avut:

$table->timestamp('last_seen')->nullable();

Aici am făcut o îmbunătățire importantă față de datele demo din React.

În React aveai ceva de genul:

12:45
Yesterday

Dar pentru monitorizare reală vrem un timestamp real:

2026-08-11 19:30:00

De aceea:

timestamp

și:

nullable()

înseamnă că poate fi momentan NULL.

Și:

$table->timestamps();

creează automat:

created_at
updated_at

Laravel le poate actualiza automat.

4. Modelul Device

Ai creat:

app/Models/Device.php

și:

class Device extends Model
{
    protected $fillable = [
        'name',
        'ip',
        'mac',
        'type',
        'status',
        'last_seen',
    ];
}

Aici avem o idee foarte importantă:

Model Device
       ↓
tabela devices

Laravel respectă convenția:

Device → devices
User   → users

Nu trebuie să-i spunem explicit că Device folosește devices.

$fillable

Ai văzut că nu am pus:

id
created_at
updated_at

în $fillable.

Pentru că acestea sunt gestionate de sistem.

În schimb:

name
ip
mac
type
status
last_seen

sunt datele pe care vrem să le putem introduce/modifica.

5. Controller

Ai creat:

app/Http/Controllers/DeviceController.php

și ai pus:

use App\Models\Device;

Asta îi permite controller-ului să folosească modelul Device.

Apoi:

public function index()
{
    return Device::all();
}

Aici este una dintre cele mai importante linii de astăzi.

Device::all()

înseamnă:

Ia toate dispozitivele din tabela asociată modelului Device.

În spate, Eloquent ajunge practic la ceva echivalent cu:

SELECT * FROM devices;

Nu ai scris SQL manual.

Laravel/Eloquent a făcut asta pentru tine.

6. Ruta API

În:

routes/api.php

ai pus:

use App\Http\Controllers\DeviceController;

și:

Route::get('/devices', [DeviceController::class, 'index']);

Asta este legătura dintre URL și controller.

Când browserul cere:

GET /api/devices

Laravel știe:

/api/devices
      ↓
DeviceController
      ↓
index()

iar index() face:

Device::all()
7. Și am făcut primul test REAL

Ai deschis:

http://127.0.0.1:8000/api/devices

și ai primit:

[]

Și asta este un rezultat foarte bun.

Nu înseamnă că API-ul nu funcționează.

Înseamnă:

API funcționează
      ↓
Controller funcționează
      ↓
Model funcționează
      ↓
MySQL funcționează
      ↓
devices există
      ↓
dar nu există încă dispozitive
      ↓
[]

