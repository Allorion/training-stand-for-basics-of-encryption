import sys

blocks = (
(4, 10, 9, 2, 13, 8, 0, 14, 6, 11, 1, 12, 7, 15, 5, 3),
(14, 11, 4, 12, 6, 13, 15, 10, 2, 3, 8, 1, 0, 7, 5, 9),
(5, 8, 1, 13, 10, 3, 4, 2, 14, 15, 12, 7, 6, 0, 9, 11),
(7, 13, 10, 1, 0, 8, 9, 15, 14, 4, 6, 12, 11, 2, 5, 3),
(6, 12, 7, 1, 5, 15, 13, 8, 4, 10, 9, 14, 0, 3, 11, 2),
(4, 11, 10, 0, 7, 2, 1, 13, 3, 6, 8, 5, 9, 12, 15, 14),
(13, 11, 4, 1, 3, 15, 5, 9, 0, 10, 14, 7, 6, 8, 2, 12),
(1, 15, 13, 0, 5, 7, 10, 4, 9, 2, 3, 14, 6, 11, 8, 12),
)
# ключ
key = 18318279387912387912789378912379821879387978238793278872378329832982398023031

def bit_length(value):
return len(bin(value)[2:])


class CryptGost(object):
def __init__(self, key, sbox):
assert bit_length(key) <= 256
self._key = None
self._subkeys = None
self.key = key
self.sbox = sbox

@property
def key(self):
return self._key

@key.setter
def key(self, key):
assert bit_length(key) <= 256

self._key = key
self._subkeys = [(key >> (32 * i)) & 0xFFFFFFFF for i in range(8)]  # 8 кусков

def _f(self, part, key):
"""Функция шифрования (выполняется в раудах)"""
assert bit_length(part) <= 32
assert bit_length(part) <= 32
temp = part ^ key  # складываем по модулю
output = 0
for i in range(8):
output |= ((self.sbox[i][(temp >> (4 * i)) & 0b1111]) << (4 * i))
# всё слово циклически сдвигается влево (к старшим разрядам) на 11 битов.
return ((output >> 11) | (output << (32 - 11))) & 0xFFFFFFFF

def _decrypt_round(self, left_part, right_part, round_key):
return left_part, right_part ^ self._f(left_part, round_key)

def encrypt(self, msg):
# "Шифрование исходного сообщения"

def _encrypt_round(left, right, round_key):
return right, left ^ self._f(right, round_key)

assert bit_length(msg) <= 64
left_part = msg >> 32
right_part = msg & 0xFFFFFFFF
for i in range(24):
left_part, right_part = _encrypt_round(left_part, right_part, self._subkeys[i % 8])
for i in range(8):
left_part, right_part = _encrypt_round(left_part, right_part, self._subkeys[7 - i])
return (left_part << 32) | right_part

def decrypt(self, crypted_msg):
def _decrypt_round(left_part, right_part, round_key):
return right_part ^ self._f(left_part, round_key), left_part

assert bit_length(crypted_msg) <= 64
left_part = crypted_msg >> 32
right_part = crypted_msg & 0xFFFFFFFF
for i in range(8):
left_part, right_part = _decrypt_round(left_part, right_part, self._subkeys[i])
for i in range(24):
left_part, right_part = _decrypt_round(left_part, right_part, self._subkeys[(7 - i) % 8])
return (left_part << 32) | right_part  # сливаем половинки вместе


def main(argv=None):
# Если аргументов не 4, название файла и 3 аргумента, выходим
if len(sys.argv) != 4:
return
# если не указан аргумент шифровки-дешифровки выходим
if sys.argv[1] != '-s' and sys.argv[1] != '-d':
return
# если требуется зашифровать
if sys.argv[1] == '-s':
cyphred = [] # тут будет хранится зашифрованный текст
gost = CryptGost(key, blocks)
try:
s = []
# Читаем из файла текст и шифруем каждую букву
with open(sys.argv[2], 'rb') as file:
# s = file.read()
byte = file.read(1)
while byte:
s.append(ord(byte))
byte = file.read(1)
for x in s:
cyphred.append(gost.encrypt(x))
except: # если не удалось открыть файл, выходим
return
try:
# записываем зашифрованный текст в файл
with open(sys.argv[3], 'w') as file:
print(*cyphred, file=file)
print("Файл зашифрован")
except:
return
if sys.argv[1] == '-d':
decyphred = []
gost = CryptGost(key, blocks)
try:
with open(sys.argv[2]) as file:
s = file.read()
for x in s.split():
decyphred.append(gost.decrypt(int(x)))
except:
print(f"Не удалось открыть файл {sys.argv[2]}")
return
try:
with open(sys.argv[3], 'wb') as file:
# объеденяем расшифрованные символы в строку и записываем в файл
file.write(bytes(decyphred))
print("Файл расшифрован")
except:
print(f"Не удалось открыть файл {sys.argv[3]}")
return
if __name__ == "__main__":
main()