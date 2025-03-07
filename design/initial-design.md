# Identificar entidades, atributos y claves primarias

* Usuario(id(PK), ...)
* Rol(id(PK), ...)

# Establecer la cardinalidad

En general un rol puede agrupar muchos usuarios, pero un usuario sólo puede poseer un rol. Entonces:

~~~
+-------+---+
|Usuario|Rol|
+-------+---+
|   1   | 1 |
|       |   |
|   N   | 1 |
+-------+---+
|   N   | 1 |
+-------+---+
~~~

# Diagrama entidad relación

~~~
+-------+                              +---+
|Usuario|----N----(Pertenece)----1---->|Rol|
+-------+                              +---+
~~~

# Identificar entidades adicionales y claves foráneas

* Usuario(id(PK), ... , rol_id(FK))
* Rol(id(PK), ...)
