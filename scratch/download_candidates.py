import urllib.request
import ssl
import os

ssl._create_default_https_context = ssl._create_unverified_context
os.makedirs("scratch/candidates", exist_ok=True)

downloads = [
    ("open_isuzu", "https://upload.wikimedia.org/wikipedia/commons/a/a2/Isuzu_NQR_Dropside_Cargo_Truck_2026.jpg"),
    ("container_msc", "https://upload.wikimedia.org/wikipedia/commons/4/45/MSC_container_truck_in_Montreal_20260629.jpg"),
    ("tipper_arocs", "https://upload.wikimedia.org/wikipedia/commons/1/19/Mercedes-Benz_Arocs_4845K_Dump_Truck_%28Mining_Indonesia_2026%29.jpg"),
    ("trailer_lowbed", "https://upload.wikimedia.org/wikipedia/commons/b/bd/Extendable_3_Axle_Lowbed_-_Extendable_4_Axle_Lowbed_-_STU_TRAILERS_02.jpg"),
    ("tanker_scania", "https://upload.wikimedia.org/wikipedia/commons/0/08/Scania_P_380_fuel_tanker_semi-trailer_at_a_Shell_service_station_in_Capiov%C3%AD%2C_Misiones_%28Argentina%29.jpg"),
    ("tanker_isuzu", "https://upload.wikimedia.org/wikipedia/commons/0/02/Isuzu_FVM_Fuel_Tanker_Truck_2017.jpg"),
    ("reefer_johnson", "https://upload.wikimedia.org/wikipedia/commons/7/77/Johnson_Refrigerated_Bodies.JPG"),
    ("reefer_scania", "https://upload.wikimedia.org/wikipedia/commons/b/b4/Scania_R500_Refrigerated_Trailer_-_pulls_in_at_Clonard%2C_Co._Meath_Ireland_-_May_2012_%287182447138%29.jpg"),
    ("flatbed_innovia", "https://upload.wikimedia.org/wikipedia/commons/b/b2/Innovia_APM_300R_on_flatbed_trailer_with_truck_at_DIA_2025-08-20.jpg"),
    ("flatbed_general", "https://upload.wikimedia.org/wikipedia/commons/7/7f/Flatbed_truck.jpg"),
    ("custom_wrecker", "https://upload.wikimedia.org/wikipedia/commons/1/1d/HTH_WINTER_RECOVERY.jpg"),
    ("custom_crane", "https://upload.wikimedia.org/wikipedia/commons/a/aa/Isuzu_Forward_FTR_Dropside_Cargo_and_Crane_Truck_2008.jpg"),
    ("facility_mercedes", "https://upload.wikimedia.org/wikipedia/commons/0/0b/Unimog_U400_production_%28assembly_line%29_Mercedes-Benz_W%C3%B6rth.jpg")
]

for name, url in downloads:
    dest = f"scratch/candidates/{name}.jpg"
    print(f"Downloading {name}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'TruckBodyBuilder/1.0 (contact@truckbodybuilder.com)'})
        with urllib.request.urlopen(req, timeout=30) as resp, open(dest, 'wb') as f:
            f.write(resp.read())
        sz = os.path.getsize(dest)
        print(f"  Saved {dest} ({sz / 1024:.1f} KB)")
    except Exception as e:
        print(f"  Error downloading {name}: {e}")
